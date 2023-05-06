import sseclient

messages = sseclient.SSEClient('http://localhost:9000/object-stream')

for msg in messages:
  print(msg)
