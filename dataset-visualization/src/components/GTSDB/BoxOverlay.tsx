import { useRef, useEffect } from "react";
import { Box } from "@mui/material";

function BoxOverlay({
  box,
  imageDimensions,
}: {
  box: { left: number; top: number; right: number; bottom: number };
  imageDimensions: { width: number; height: number };
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

    const scaleX = canvasWidth / imageDimensions.width;
    const scaleY = canvasHeight / imageDimensions.height;

    context.strokeStyle = "lime";
    context.lineWidth = 3;

    context.strokeRect(
      box.left * scaleX,
      box.top * scaleY,
      (box.right - box.left) * scaleX,
      (box.bottom - box.top) * scaleY
    );
  }, [canvasRef, box, imageDimensions]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{ width: "100%", height: "100%" }}
    />
  );
}

export default BoxOverlay;
