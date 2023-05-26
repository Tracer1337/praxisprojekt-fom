import { Box } from "@mui/material";
import { ObjectDetection, WEBCAM_HEIGHT, WEBCAM_WIDTH } from "../../lib/raspi";
import ImageWithFallback from "../ImageWithFallback";
import BoxOverlay from "../BoxOverlay";

function ImageWithObjects({
  src,
  objects,
}: {
  src: string;
  objects: ObjectDetection[];
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <ImageWithFallback
        src={src}
        alt="Video Stream"
        fallbackWidth={WEBCAM_WIDTH}
        fallbackHeight={WEBCAM_HEIGHT}
      />
      {objects.map((object, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <BoxOverlay
            box={object}
            originalWidth={WEBCAM_WIDTH}
            originalHeight={WEBCAM_HEIGHT}
          />
        </Box>
      ))}
    </Box>
  );
}

export default ImageWithObjects;
