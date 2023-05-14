import { useState, useCallback } from "react";
import { ControllerState, WebsocketReceiveEvent } from "../../../lib/raspi";
import { useWebsocket } from "../../../lib/websocket";

const threshold = 0.5;

function useControllerState() {
  const [state, setState] = useState<ControllerState>();

  const handleMessage = useCallback((message: WebsocketReceiveEvent) => {
    if (message.event === "controller.state") {
      setState(message.data);
    }
  }, []);

  const { ready, send } = useWebsocket(handleMessage);

  const sendControllerUpdate = useCallback(
    (data: Partial<ControllerState>) => {
      if (!ready) {
        return;
      }
      send({ event: "controller.update", data });
    },
    [ready, send]
  );

  const handleMove = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      sendControllerUpdate({
        forward: y > threshold,
        backward: y < -threshold,
        left: x < -threshold,
        right: x > threshold,
      });
    },
    [sendControllerUpdate]
  );

  const handleCamera = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      sendControllerUpdate({
        cameraUp: y > threshold,
        cameraDown: y < -threshold,
        cameraLeft: x < -threshold,
        cameraRight: x > threshold,
      });
    },
    [sendControllerUpdate]
  );

  const setAutomation = useCallback(
    (value: boolean) => {
      sendControllerUpdate({
        automation: value,
      });
    },
    [sendControllerUpdate]
  );

  const setSpeed = useCallback(
    (value: boolean) => {
      sendControllerUpdate({
        speed: value,
      });
    },
    [sendControllerUpdate]
  );

  return {
    state,
    sendControllerUpdate,
    handleMove,
    handleCamera,
    setAutomation,
    setSpeed,
  };
}

export default useControllerState;
