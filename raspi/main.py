import argparse
import requests
import cv2
from flask import Flask, Response
import json
from message_announcer import MessageAnnouncer
from threading import Thread

vid = cv2.VideoCapture(0)
object_stream = MessageAnnouncer()

def parse_args():
  global args
  parser = argparse.ArgumentParser(description='SunFounder PiCar-V Remote Control')
  parser.add_argument('--object-detection-url', help='url to the object-detection endpoint', required=True)
  return parser.parse_args()

def detect(img, args):
  res = requests.post(
    args.object_detection_url,
    files={ 'image': img },
  )

  if res.status_code != 200:
    raise Exception('Failed to call object-detection endpoint')
  
  return res.json()

def format_sse(data, event=None):
    msg = f'data: {data}\n\n'
    if event is not None:
        msg = f'event: {event}\n{msg}'
    return msg

def run_object_detection(args):
  print("Run Object Detection")
  while True:
    _, img = vid.read()
    frame = cv2.imencode('.jpg', img)[1].tobytes()
    objects = detect(frame, args)
    data = format_sse(json.dumps(objects))
    object_stream.announce(data)

app = Flask(__name__)
@app.route('/object-stream')
def index():
  def stream():
    messages = object_stream.listen()
    while True:
      msg = messages.get()
      yield msg

  return Response(stream(), mimetype='text/event-stream')

def start_server():
  app.run(host='0.0.0.0', port=9000, threaded=True)

if __name__ == '__main__':
  args = parse_args()

  thread = Thread(target=run_object_detection, args=(args,))
  thread.start()

  start_server()

  vid.release()

