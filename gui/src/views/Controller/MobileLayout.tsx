import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { WEBCAM_HEIGHT, WEBCAM_WIDTH, useRaspi } from "../../lib/raspi";
import Vision from "../../components/Vision";
import useTrafficSignDetection from "./hooks/useTrafficSignDetection";
import Controller from "../../components/Controller";
import ObjectList from "../../components/ObjectList";
import Action from "../../components/Action";

function MobileLayout() {
  const raspi = useRaspi();

  const { videoStreamUrl, getTrafficSignUrl } = raspi.config();

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
          <Vision
            src={videoStreamUrl}
            objects={trafficSignDetections}
            sx={{ maxWidth: "100%", maxHeight: "100%" }}
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
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ m: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => raspi.setHost(null)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mx: 8, my: 2 }}>
          <Controller />
        </Box>
      </Box>
    </Box>
  );
}

export default MobileLayout;
