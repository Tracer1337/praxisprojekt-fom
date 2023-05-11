import queue

class MessageAnnouncer:
	def __init__(self, size):
		self.listeners = []
		self.size = size

	def listen(self):
		q = queue.Queue(maxsize=self.size)
		self.listeners.append(q)
		return q

	def announce(self, msg):
		for i in reversed(range(len(self.listeners))):
			try:
				self.listeners[i].put_nowait(msg)
			except queue.Full:
				continue
