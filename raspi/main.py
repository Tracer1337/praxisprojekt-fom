import argparse
import requests
import cv2
from flask import Flask, Response
import json

vid = cv2.VideoCapture(0)

args = {}

def parse_args():
  global args
  parser = argparse.ArgumentParser(description='SunFounder PiCar-V Remote Control')
  parser.add_argument('--object-detection-url', help='url to the object-detection endpoint', required=True)
  args = parser.parse_args()

def detect(img):
  global args
  res = requests.post(
    args.object_detection_url,
    files={ 'image': img },
  )

  if res.status_code != 200:
    raise Exception('Failed to call object-detection endpoint')
  
  return res.json()

def gen():
  while True:
    _, img = vid.read()
    frame = cv2.imencode('.jpg', img)[1].tobytes()
    objects = detect(frame)
    yield str.encode(json.dumps(objects))

app = Flask(__name__)
@app.route('/object-stream')
def index():
  return Response(gen(), mimetype='text/event-stream')

def object_detection_start():
  app.run(host='0.0.0.0', port=9000,threaded=True)

if __name__ == '__main__':
  parse_args()
  object_detection_start()
  vid.release()

