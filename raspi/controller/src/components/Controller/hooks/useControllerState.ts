import { useState } from "react";
import { ControllerState } from "../../../lib/raspi";
import { useWebsocket } from "../../../lib/websocket";

function useControllerState() {
  const [state, setState] = useState<ControllerState>();

  const { ready, send } = useWebsocket((message) => {
    if (message.event === "controller.state") {
      setState(message.data);
    }
  });

  const updateControllerState = <K extends keyof ControllerState>(
    action: K,
    value: ControllerState[K]
  ) => {
    if (!ready) {
      return;
    }

    send({
      event: "controller.update",
      data: { [action]: value },
    });
  };

  return [state, updateControllerState];
}

export default useControllerState;
