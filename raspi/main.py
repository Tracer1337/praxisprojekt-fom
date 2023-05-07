import requests
import cv2
from flask import Flask, Response
from flask_cors import CORS
import json
import os
from message_announcer import MessageAnnouncer
from threading import Thread
from dotenv import load_dotenv

load_dotenv()

vid = cv2.VideoCapture(0)
# vid.set(3,320)
# vid.set(4,240)
vid.set(cv2.CAP_PROP_BUFFERSIZE,1)
cv2.setUseOptimized(True)

road_sign_stream = MessageAnnouncer(size=5)
camera_stream = MessageAnnouncer(size=1)

def detect_road_signs(img):
  res = requests.post(
    os.environ['ROAD_SIGN_DETECTION_URL'],
    files={ 'image': img },
  )

  if res.status_code != 200:
    raise Exception('Failed to call road-sign-detection endpoint')
  
  return res.json()

def format_sse(data, event=None):
    msg = f'data: {data}\n\n'
    if event is not None:
        msg = f'event: {event}\n{msg}'
    return msg

def run_road_sign_detection():
  print("Run Road Sign Detection")
  messages = camera_stream.listen()
  while True:
    frame = messages.get()
    detections = detect_road_signs(frame)
    data = format_sse(json.dumps(detections))
    road_sign_stream.announce(data)

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

@app.route('/road-sign-stream')
def road_sign_detection_stream():
  def stream():
    messages = road_sign_stream.listen()
    while True:
      msg = messages.get()
      yield msg

  return Response(stream(), mimetype='text/event-stream')

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

def start_server():
  app.run(host='0.0.0.0', port=9000, threaded=True)

if __name__ == '__main__':
  Thread(target=run_road_sign_detection).start()

  Thread(target=run_camera_capture).start()

  start_server()

  vid.release()

