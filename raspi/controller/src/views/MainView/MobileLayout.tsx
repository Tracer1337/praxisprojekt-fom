import { Box } from "@mui/material";
import { useRaspiConfig } from "../../lib/raspi";
import ImageWithObjects from "./ImageWithObjects";
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          aspectRatio: 4 / 3,
          "& > .MuiBox-root:first-of-type": {
            height: "100vh",
            overflow: "hidden",
            img: {
              width: "100%",
            },
          },
        }}
      >
        <ImageWithObjects
          src={videoStreamUrl}
          objects={trafficSignDetections}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            m: 2,
          }}
        >
          <Box
            sx={{
              height: "40%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Action />
            <ObjectList
              objects={trafficSignDetections}
              getImageUrl={getTrafficSignUrl}
            />
          </Box>
          <Box>
            <Controller />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MobileLayout;
