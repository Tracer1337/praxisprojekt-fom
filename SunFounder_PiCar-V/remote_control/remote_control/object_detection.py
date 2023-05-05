import requests
from .arguments import Arguments

class ObjectDetection(object):
  @staticmethod
  def detect(img):
    res = requests.post(
      Arguments.args.object_detection_url,
      files={ 'image': img },
    )

    if res.status_code != 200:
      raise Exception('Failed to call object-detection endpoint')
    
    return res.json()
