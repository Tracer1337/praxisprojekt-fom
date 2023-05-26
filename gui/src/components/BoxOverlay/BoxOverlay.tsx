import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";

function BoxOverlay({
  box,
  originalWidth,
  originalHeight,
}: {
  box: ObjectDetection;
  originalWidth: number;
  originalHeight: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !context) {
      return;
    }

    const canvasWidth = context.canvas.clientWidth;
    const canvasHeight = context.canvas.clientHeight;

    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;

    const scaleX = canvasWidth / originalWidth;
    const scaleY = canvasHeight / originalHeight;

    context.strokeStyle = "lime";
    context.lineWidth = 3;

    context.strokeRect(
      box.xmin * scaleX,
      box.ymin * scaleY,
      (box.xmax - box.xmin) * scaleX,
      (box.ymax - box.ymin) * scaleY
    );
  }, [canvasRef, box, originalWidth, originalHeight]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{ width: "100%", height: "100%" }}
    />
  );
}

export default BoxOverlay;
