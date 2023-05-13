import { useRef, useEffect } from "react";
import Hammer from "hammerjs";

function useJoystickControls({
  size,
  onChange,
  reset = true,
}: {
  size: number;
  onChange: (data: { x: number; y: number }) => void;
  reset?: boolean;
}) {
  const thumbRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const thumb = thumbRef.current;

    if (!thumb) {
      return;
    }

    const thumbSize = size / 2;
    const center = size / 2 - thumbSize / 2;

    const startPos = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };

    const setPosition = (x: number, y: number) => {
      position.x = Math.max(Math.min(startPos.x + x, center), -center);
      position.y = Math.max(Math.min(startPos.y + y, center), -center);

      const posX = center + position.x;
      const posY = center + position.y;

      thumb.style.transform = `translate(${posX}px, ${posY}px)`;

      onChange({
        x: position.x / center,
        y: position.y / center,
      });
    };

    const gestures = new Hammer(thumb);

    gestures.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    gestures.on("pan", (event) => {
      setPosition(event.deltaX, event.deltaY);
    });

    gestures.on("panend", () => {
      if (!reset) {
        return;
      }
      setPosition(0, 0);
    });

    setPosition(0, 0);

    return () => {
      gestures.destroy();
    };
  }, [size, onChange, reset]);

  return { thumbRef };
}

export default useJoystickControls;
