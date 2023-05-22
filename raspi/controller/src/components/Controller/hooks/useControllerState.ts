import { useState, useCallback } from "react";
import { ControllerState, WebsocketReceiveEvent } from "../../../lib/raspi";
import { useWebsocket } from "../../../lib/websocket";

const threshold = 0.5;

function useControllerState({
  update,
}: {
  update: (data: Partial<ControllerState>) => void;
}) {
  const [state, setState] = useState<ControllerState>();

  const handleMessage = useCallback((message: WebsocketReceiveEvent) => {
    if (message.event === "controller.state") {
      setState(message.data);
    }
  }, []);

  useWebsocket(handleMessage);

  const handleMove = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      update({
        forward: y > threshold,
        backward: y < -threshold,
        left: x < -threshold,
        right: x > threshold,
      });
    },
    [update]
  );

  const handleCamera = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      update({
        cameraUp: y > threshold,
        cameraDown: y < -threshold,
        cameraLeft: x < -threshold,
        cameraRight: x > threshold,
      });
    },
    [update]
  );

  const setAutomation = useCallback(
    (value: boolean) => {
      update({
        automation: value,
      });
    },
    [update]
  );

  const setSpeed = useCallback(
    (value: boolean) => {
      update({
        speed: value,
      });
    },
    [update]
  );

  return {
    state,
    handleMove,
    handleCamera,
    setAutomation,
    setSpeed,
  };
}

export default useControllerState;
