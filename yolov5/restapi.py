# YOLOv5 🚀 by Ultralytics, AGPL-3.0 license
"""
Run a Flask REST API exposing one or more YOLOv5s models
"""

import argparse
import io

import torch
from flask import Flask, request
from PIL import Image

app = Flask(__name__)

DETECTION_URL = '/v1/object-detection'


@app.route(DETECTION_URL, methods=['POST'])
def predict():
    if request.method != 'POST':
        return

    if request.files.get('image'):
        # Method 1
        # with request.files["image"] as f:
        #     im = Image.open(io.BytesIO(f.read()))

        # Method 2
        im_file = request.files['image']
        im_bytes = im_file.read()
        im = Image.open(io.BytesIO(im_bytes))

        results = model(im, size=640)  # reduce size=320 for faster inference
        return results.pandas().xyxy[0].to_json(orient='records')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Flask API exposing YOLOv5 model')
    parser.add_argument('--port', default=5000, type=int, help='port number')
    parser.add_argument('--model', help='model to run')
    opt = parser.parse_args()

    path = f'../models/{opt.model}/weights/best.pt'
    print(f'Loading model: {path}')

    model = torch.hub.load('./', 'custom', path, source='local')

    app.run(host='0.0.0.0', port=opt.port)  # debug=True causes Restarting with stat
