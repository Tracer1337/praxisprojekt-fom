import { useRef, useEffect } from "react";
import { ObjectDetection } from "../../../lib/raspi";

function useDrawBoxOverlay({
  image,
  objects,
}: {
  image: HTMLImageElement | null;
  objects: ObjectDetection[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !context || !image) {
      return;
    }

    let isActive = true;

    const draw = () => {
      if (!isActive) {
        return;
      }

      const canvasWidth = image.naturalWidth;
      const canvasHeight = image.naturalHeight;

      context.canvas.width = canvasWidth;
      context.canvas.height = canvasHeight;

      const scaleX = canvasWidth / image.naturalWidth;
      const scaleY = canvasHeight / image.naturalHeight;

      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      context.strokeStyle = "lime";
      context.lineWidth = 5;

      objects.forEach((box) =>
        context.strokeRect(
          box.xmin * scaleX,
          box.ymin * scaleY,
          (box.xmax - box.xmin) * scaleX,
          (box.ymax - box.ymin) * scaleY
        )
      );

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      isActive = false;
    };
  }, [canvasRef, objects, image]);

  return canvasRef;
}

export default useDrawBoxOverlay;
