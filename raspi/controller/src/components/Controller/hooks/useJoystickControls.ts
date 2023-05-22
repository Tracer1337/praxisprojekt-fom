import { useRef, useEffect } from "react";
import Hammer from "hammerjs";

function useJoystickControls({
  size,
  onChange,
  throttle,
}: {
  size: number;
  onChange: (data: { x: number; y: number }) => void;
  throttle?: number;
}) {
  const thumbRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const thumb = thumbRef.current;

    if (!thumb) {
      return;
    }

    const thumbSize = size / 2;
    const center = size / 2 - thumbSize / 2;

    const position = { x: 0, y: 0 };

    let lastTime = performance.now();

    const isThrottled = () => {
      if (!throttle) {
        return false;
      }

      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      if (elapsed < throttle) {
        return true;
      }

      lastTime = currentTime;

      return false;
    };

    const setPosition = (x: number, y: number) => {
      const angle = Math.atan2(y, x);

      x = Math.max(Math.min(x, center), -center) / center;
      y = (Math.max(Math.min(y, center), -center) / center) * -1;

      x = Math.min(Math.abs(x), Math.abs(Math.cos(angle))) * Math.sign(x);
      y = Math.min(Math.abs(y), Math.abs(Math.sin(angle))) * Math.sign(y);

      position.x = x * center;
      position.y = -y * center;

      const posX = center + position.x;
      const posY = center + position.y;

      thumb.style.transform = `translate(${posX}px, ${posY}px)`;

      if (!isThrottled()) {
        onChange({
          x: position.x / center,
          y: -position.y / center,
        });
      }
    };

    const gestures = new Hammer(thumb);

    gestures.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    gestures.on("pan", (event) => {
      setPosition(event.deltaX, event.deltaY);
    });

    gestures.on("panend", () => {
      setPosition(0, 0);
    });

    setPosition(0, 0);

    return () => {
      gestures.destroy();
    };
  }, [size, onChange, throttle]);

  return { thumbRef };
}

export default useJoystickControls;
