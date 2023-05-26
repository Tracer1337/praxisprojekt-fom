import { Box } from "@mui/material";
import { WEBCAM_HEIGHT, WEBCAM_WIDTH, useRaspiConfig } from "../../lib/raspi";
import ImageWithObjects from "../../components/ImageWithObjects";
import useTrafficSignDetection from "./hooks/useTrafficSignDetection";
import Controller from "../../components/Controller";
import ObjectList from "../../components/ObjectList";
import Action from "../../components/Action";

function MobileLayout() {
  const { videoStreamUrl, getTrafficSignUrl } = useRaspiConfig();

  const trafficSignDetections = useTrafficSignDetection();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          aspectRatio: WEBCAM_WIDTH / WEBCAM_HEIGHT,
          position: "relative",
        }}
      >
        <Box
          sx={{
            "& > .MuiBox-root:first-of-type": {
              overflow: "hidden",
              img: {
                maxHeight: "100%",
                maxWidth: "100%",
              },
            },
          }}
        >
          <ImageWithObjects
            src={videoStreamUrl}
            objects={trafficSignDetections}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bottom: "unset",
            height: "40%",
            display: "flex",
            justifyContent: "space-between",
            m: 1,
          }}
        >
          <Action />
          <ObjectList
            objects={trafficSignDetections}
            getImageUrl={getTrafficSignUrl}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          mx: 8,
          my: 2,
        }}
      >
        <Controller />
      </Box>
    </Box>
  );
}

export default MobileLayout;
