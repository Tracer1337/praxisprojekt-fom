import { Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";
import VideoStream from "../../components/VideoStream";
import BoxOverlay from "../../components/BoxOverlay";

function ImageWithObjects({
  src,
  objects,
}: {
  src: string;
  objects: ObjectDetection[];
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <VideoStream src={src} alt="Video Stream" />
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
          <BoxOverlay box={object} />
        </Box>
      ))}
    </Box>
  );
}

export default ImageWithObjects;
