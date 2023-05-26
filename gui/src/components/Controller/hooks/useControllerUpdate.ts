import { useRef, useCallback } from "react";
import { ControllerState, WebsocketReceiveEvent } from "../../../lib/raspi";
import { useWebsocket } from "../../../lib/websocket";

function useControllerUpdate() {
  const state = useRef<ControllerState>();

  const handleMessage = useCallback((message: WebsocketReceiveEvent) => {
    if (message.event === "controller.state") {
      state.current = message.data;
    }
  }, []);

  const { ready, send } = useWebsocket(handleMessage);

  const sendControllerUpdate = useCallback(
    (data: Partial<ControllerState>) => {
      const currentState = state.current;

      if (!ready || !currentState) {
        return;
      }

      const hasChanged = (Object.keys(data) as (keyof ControllerState)[]).some(
        (key) => data[key] !== currentState[key]
      );

      if (!hasChanged) {
        return;
      }

      send({ event: "controller.update", data });
    },
    [ready, send]
  );

  return sendControllerUpdate;
}

export default useControllerUpdate;
