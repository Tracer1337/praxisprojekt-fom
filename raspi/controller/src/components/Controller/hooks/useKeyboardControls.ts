import { useEffect } from "react";
import { ControllerState } from "../../../lib/raspi";

const keyMapping: Record<string, keyof ControllerState> = {
  w: "forward",
  a: "left",
  s: "backward",
  d: "right",
  ArrowUp: "cameraUp",
  ArrowLeft: "cameraLeft",
  ArrowDown: "cameraDown",
  ArrowRight: "cameraRight",
};

function useKeyboardControls({
  state,
  update,
}: {
  state?: ControllerState;
  update: (data: Partial<ControllerState>) => void;
}) {
  useEffect(() => {
    if (!state) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = keyMapping[event.key];
      if (typeof key === "undefined" || state[key]) {
        return;
      }
      update({ [key]: true });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in keyMapping) {
        update({ [keyMapping[event.key]]: false });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [state, update]);
}

export default useKeyboardControls;
