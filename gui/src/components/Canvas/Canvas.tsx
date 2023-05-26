import { Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";
import useDrawBoxOverlay from "./hooks/useBoxOverlay";
import useImage from "./hooks/useImage";

function Canvas({ src, objects }: { src: string; objects: ObjectDetection[] }) {
  const image = useImage(src);

  const canvasRef = useDrawBoxOverlay({ image, objects });

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{ width: "100%", maxWidth: 800 }}
    />
  );
}

export default Canvas;
