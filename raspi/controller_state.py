import requests
from threading import Condition

class ControllerState:
  def __init__(self, sunfounder_port):
    self.sunfounder_port = sunfounder_port
    self.available = True

    self.forward = False
    self.backward = False
    self.left = False
    self.right = False
    
    self.cameraUp = False
    self.cameraDown = False
    self.cameraLeft = False
    self.cameraRight = False

    self.speed = True
    self.automation = False

    self.action_mapping = {
      'forward': ('forward', 'stop'),
      'backward': ('backward', 'stop'),
      'left': ('fwleft', 'fwstraight'),
      'right': ('fwright', 'fwstraight'),
      'cameraUp': ('camup', 'camready'),
      'cameraDown': ('camdown', 'camready'),
      'cameraLeft': ('camleft', 'camready'),
      'cameraRight': ('camright', 'camready'),
    }

    self.cv = Condition()

  def run_sunfounder_action(self, action, value=None):
    if not self.available:
      return
    query = 'speed' if action == 'speed' else 'action'
    value = value if action == 'speed' else action
    try:
      requests.get(f'http://localhost:{self.sunfounder_port}/run?{query}={value}')
    except:
      self.available = False

  def setup(self):
    self.run_sunfounder_action('setup')
    self.run_sunfounder_action('bwready')
    self.run_sunfounder_action('fwready')
    self.run_sunfounder_action('camready')

  def update(self, values):
    self.forward = values.get('forward', self.forward)
    self.backward = values.get('backward', self.backward)
    self.left = values.get('left', self.left)
    self.right = values.get('right', self.right)
    
    self.cameraUp = values.get('cameraUp', self.cameraUp)
    self.cameraDown = values.get('cameraDown', self.cameraDown)
    self.cameraLeft = values.get('cameraLeft', self.cameraLeft)
    self.cameraRight = values.get('cameraRight', self.cameraRight)

    self.speed = values.get('speed', self.speed)
    self.automation = values.get('automation', self.automation)

    self.sync(values)

    with self.cv:
      self.cv.notify_all()
  
  def sync(self, actions):
    for action, value in actions.items():
      if action == 'speed':
        self.run_sunfounder_action(action, value)

      if action in self.action_mapping:
        mapped = self.action_mapping[action][0 if value else 1]
        self.run_sunfounder_action(mapped)

  def __dict__(self):
    return {
      'available': self.available,

      'forward': self.forward,
      'backward': self.backward,
      'left': self.left,
      'right': self.right,
    
      'cameraUp': self.cameraUp,
      'cameraDown': self.cameraDown,
      'cameraLeft': self.cameraLeft,
      'cameraRight': self.cameraRight,

      'speed': self.speed,
      'automation': self.automation,
    }
