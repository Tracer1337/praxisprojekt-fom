import { Box } from "@mui/material";
import { useRaspiConfig } from "../../lib/raspi";
import ImageWithObjects from "./ImageWithObjects";
import useTrafficSignDetection from "./hooks/useTrafficSignDetection";
import Controller from "../../components/Controller";
import ObjectList from "../../components/ObjectList";

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
          img: {
            width: "100%",
          },
          "& > .MuiBox-root:first-child": {
            height: "100vh",
            overflow: "hidden",
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
          }}
        >
          <Box sx={{ height: "40%" }}>
            <ObjectList
              objects={trafficSignDetections}
              getImageUrl={getTrafficSignUrl}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <Controller />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MobileLayout;
