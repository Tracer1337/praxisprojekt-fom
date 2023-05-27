import { useState, useCallback } from "react";
import { ObjectDetection, WebsocketReceiveEvent } from "../../../lib/raspi";
import { useWebsocket } from "../../../lib/websocket";

function useTrafficSignDetection() {
  const [objects, setObjects] = useState<ObjectDetection[]>([]);

  const handleMessage = useCallback(
    (message: WebsocketReceiveEvent) => {
      if (message.event === "traffic-sign.detections") {
        setObjects(message.data);
      }

      if (message.event === "controller.state" && !message.data.automation) {
        setObjects([]);
      }
    },
    [setObjects]
  );

  useWebsocket(handleMessage);

  return objects;
}

export default useTrafficSignDetection;
