import { useCallback } from "react";
import { useWebsocket } from "../../../lib/websocket";

function useControllerReset() {
  const { ready, send } = useWebsocket();

  const sendControllerReset = useCallback(() => {
    if (!ready) {
      return;
    }

    send({ event: "controller.reset" });
  }, [ready, send]);

  return sendControllerReset;
}

export default useControllerReset;
