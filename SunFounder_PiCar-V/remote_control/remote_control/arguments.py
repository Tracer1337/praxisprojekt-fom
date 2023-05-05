import argparse

class Arguments(object):
  args = {}

  @staticmethod
  def parse():
    parser = argparse.ArgumentParser(description='SunFounder PiCar-V Remote Control')
    parser.add_argument('--object-detection-url', help='url to the object-detection endpoint', required=True)
    Arguments.args = parser.parse_args()
