import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";

function BoxOverlay({ box }: { box: ObjectDetection }) {
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

    context.strokeStyle = "lime";
    context.lineWidth = 3;

    context.strokeRect(
      box.xmin,
      box.ymin,
      box.xmax - box.xmin,
      box.ymax - box.ymin
    );
  }, [canvasRef, box]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{ width: "100%", height: "100%" }}
    />
  );
}

export default BoxOverlay;
