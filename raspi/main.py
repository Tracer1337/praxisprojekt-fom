import requests
import cv2
from flask import Flask, Response
import json
import os
from message_announcer import MessageAnnouncer
from threading import Thread
from dotenv import load_dotenv

load_dotenv()

vid = cv2.VideoCapture(0)

road_sign_stream = MessageAnnouncer()

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
  while True:
    _, img = vid.read()
    frame = cv2.imencode('.jpg', img)[1].tobytes()
    detections = detect_road_signs(frame)
    data = format_sse(json.dumps(detections))
    road_sign_stream.announce(data)

app = Flask(__name__)
@app.route('/road-sign-stream')
def index():
  def stream():
    messages = road_sign_stream.listen()
    while True:
      msg = messages.get()
      yield msg

  return Response(stream(), mimetype='text/event-stream')

def start_server():
  app.run(host='0.0.0.0', port=9000, threaded=True)

if __name__ == '__main__':
  thread = Thread(target=run_road_sign_detection)
  thread.start()

  start_server()

  vid.release()

