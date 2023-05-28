import { Box, SxProps, Theme } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";
import useDrawBoxOverlay from "./hooks/useBoxOverlay";
import useImage from "./hooks/useImage";

function Vision({
  src,
  objects,
  sx = [],
}: {
  src: string;
  objects: ObjectDetection[];
  sx?: SxProps<Theme>;
}) {
  const image = useImage(src);

  const canvasRef = useDrawBoxOverlay({ image, objects });

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={[
        {
          display: "block",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

export default Vision;
