import sseclient

messages = sseclient.SSEClient('http://192.168.0.102:9000/road-sign-stream')

for msg in messages:
  print(msg)
