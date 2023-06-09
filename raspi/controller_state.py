import requests
from threading import Condition

class ControllerState:
  actions = {
    'sunfounder_available': { 'type': bool },
    'road_sign_detection_available': { 'type': bool },
    'forward': {
      'type': bool,
      'mapping': ('forward', 'stop'),
    },
    'backward': {
      'type': bool,
      'mapping': ('backward', 'stop'),
    },
    'left': {
      'type': bool,
      'mapping': ('fwleft', 'fwstraight'),
    },
    'right': {
      'type': bool,
      'mapping': ('fwright', 'fwstraight'),
    },
    'cameraUp': {
      'type': bool,
      'mapping': ('camup', 'camready'),
    },
    'cameraDown': {
      'type': bool,
      'mapping': ('camdown', 'camready'),
    },
    'cameraLeft': {
      'type': bool,
      'mapping': ('camleft', 'camready'),
    },
    'cameraRight': {
      'type': bool,
      'mapping': ('camright', 'camready'),
    },
    'speed': { 'type': bool },
    'automation': { 'type': bool },
  }

  def __init__(self, sunfounder_port):
    self.sunfounder_port = sunfounder_port
    self.cv = Condition()

    self.reset()
  
  def reset(self):
    self.sunfounder_available = None
    self.road_sign_detection_available = None

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

    self.notify()

  def run_sunfounder_action(self, action, value=None):
    action, value = self.get_query(action, value)
    try:
      requests.get(f'http://localhost:{self.sunfounder_port}/run/?{action}={value}')
      self.update({ 'sunfounder_available': True })
    except:
      self.update({ 'sunfounder_available': False })

  def get_query(self, action, value):
    if action == 'speed':
      value = 80 if value else 40
      return action, value

    return 'action', action

  def setup(self):
    self.run_sunfounder_action('setup')
    self.run_sunfounder_action('bwready')
    self.run_sunfounder_action('fwready')
    self.run_sunfounder_action('camready')
    self.run_sunfounder_action('speed', self.speed)

  def update(self, values):
    self.validate(values)

    diff = self.diff(values)

    self.sunfounder_available = values.get('sunfounder_available', self.sunfounder_available)
    self.road_sign_detection_available = values.get('road_sign_detection_available', self.road_sign_detection_available)

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

    self.sync(diff)

    self.notify()

  def notify(self):
    with self.cv:
      self.cv.notify_all()
  
  def validate(self, actions):
    for key, value in actions.items():
      if not key in ControllerState.actions:
        raise Exception(f'Unknown action: {key}')
      if type(value) != ControllerState.actions[key]['type']:
        raise Exception(f'Invalid type {type(value)} for action {key}')

  def diff(self, actions):
    diff = {}
    for key, value in actions.items():
      if getattr(self, key) != value:
        diff[key] = value
    return diff

  def sync(self, actions):
    for key, value in actions.items():
      if key == 'speed':
        self.run_sunfounder_action(key, value)
        continue

      if 'mapping' in ControllerState.actions[key]:
        mapped = ControllerState.actions[key]['mapping'][0 if value else 1]
        self.run_sunfounder_action(mapped)

  def __dict__(self):
    return {
      'sunfounderAvailable': self.sunfounder_available,
      'roadSignDetectionAvailable': self.road_sign_detection_available,

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
