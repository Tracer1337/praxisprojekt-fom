import requests
import cv2
from flask import Flask, Response, send_from_directory
from flask_cors import CORS
import json
import os
from message_announcer import MessageAnnouncer
from threading import Thread
from dotenv import load_dotenv
from pathlib import Path
from dataset import traffic_sign_mapping
from websocket_server import WebsocketServer
from controller_state import ControllerState

load_dotenv()

PROJECT_ROOT_DIR = Path(__file__, "..", "..").resolve()
TRAFFIC_SIGN_DATASET_DIR = Path(
  PROJECT_ROOT_DIR,
  "datasets",
  "traffic-signs",
).resolve()

vid = cv2.VideoCapture(0)
# vid.set(3,320)
# vid.set(4,240)
vid.set(cv2.CAP_PROP_BUFFERSIZE,1)
cv2.setUseOptimized(True)

road_sign_stream = MessageAnnouncer(size=5)
camera_stream = MessageAnnouncer(size=1)

controller = ControllerState(sunfounder_port=os.environ['SUNFOUNDER_PORT'])

def detect_road_signs(img):
  res = requests.post(
    os.environ['ROAD_SIGN_DETECTION_URL'],
    files={ 'image': img },
  )

  if res.status_code != 200:
    raise Exception('Failed to call road-sign-detection endpoint')
  
  return res.json()

def run_road_sign_detection():
  print("Run Road Sign Detection")
  messages = camera_stream.listen()
  while True:
    frame = messages.get()
    if not controller.automation:
      continue
    detections = detect_road_signs(frame)
    if not controller.automation:
      continue
    road_sign_stream.announce(detections)

def run_camera_capture():
  print("Run Video Capture")
  while True:
    ret, img = vid.read()
    if not ret:
      continue
    frame = cv2.imencode('.jpg', img)[1].tobytes()
    camera_stream.announce(frame)

app = Flask(__name__)
CORS(app)
ws = WebsocketServer(host='0.0.0.0', port=9001)

@app.route('/health-check')
def health_check():
  return 'available'

@app.route('/video-stream')
def video_feed():
  def stream():
    messages = camera_stream.listen()
    while True:
      frame = messages.get()
      yield (b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

  return Response(stream(),
    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/traffic-sign/<objectId>')
def traffic_sign(objectId):
  name = traffic_sign_mapping[objectId]
  return send_from_directory(TRAFFIC_SIGN_DATASET_DIR, name + '.jpg')

def message_received(client, server, message):
  message = json.loads(message)
  event, data = message['event'], message['data']
  if event == 'controller.update':
    try:
      controller.update(data)
    except Exception as e:
      server.send_message(client, json.dumps({
        'event': 'error',
        'data': str(e),
      }))

ws.set_fn_message_received(message_received)

def new_client(client, server):
  server.send_message(client, json.dumps({
    'event': 'controller.state',
    'data': controller.__dict__(),
  }))

ws.set_fn_new_client(new_client)

def emit_road_sign_data():
  messages = road_sign_stream.listen()
  while True:
    msg = messages.get()
    ws.send_message_to_all(json.dumps({
      'event': 'traffic-sign.detections',
      'data': msg,
    }))

def emit_controller_updates():
  while True:
    with controller.cv:
      controller.cv.wait()
    ws.send_message_to_all(json.dumps({
      'event': 'controller.state',
      'data': controller.__dict__()
    }))

def start_server():
  ws.run_forever(threaded=True)

  Thread(target=emit_road_sign_data).start()

  Thread(target=emit_controller_updates).start()

  app.run(host='0.0.0.0', port=9000, threaded=True)

if __name__ == '__main__':
  Thread(target=run_road_sign_detection).start()

  Thread(target=run_camera_capture).start()

  controller.setup()

  start_server()

  vid.release()

