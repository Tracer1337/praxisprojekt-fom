import requests
from .arguments import Arguments

class ObjectDetection(object):
  @staticmethod
  def detect(img):
    res = requests.post(
      ObjectDetection.__get_object_detection_url(),
      files={ 'image': img },
    )

    if res.status_code != 200:
      raise Exception('Failed to call object-detection endpoint')
    
    return res.json()
  
  @staticmethod
  def __get_object_detection_url():
    if not Arguments.args.object_detection_url:
      raise Exception('Missing object-detection url')

    return Arguments.args.object_detection_url

