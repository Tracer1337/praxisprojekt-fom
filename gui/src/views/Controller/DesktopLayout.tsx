import { Box, Paper } from "@mui/material";
import ObjectList from "../../components/ObjectList";
import Controller from "../../components/Controller";
import Action from "../../components/Action";
import { useRaspiConfig } from "../../lib/raspi";
import useTrafficSignDetection from "./hooks/useTrafficSignDetection";
import Vision from "../../components/Vision";
import ControllerDescriptionImage from "../../assets/controller_description.svg";

function DesktopLayout() {
  const { videoStreamUrl, getTrafficSignUrl } = useRaspiConfig();

  const trafficSignDetections = useTrafficSignDetection();

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 800px 1fr",
          gridTemplateRows: "480px",
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={ControllerDescriptionImage}
          sx={{ width: "100%", maxWidth: 400, justifySelf: "flex-end" }}
        />
        <Box>
          <Paper
            sx={{ display: "flex", justifyContent: "center" }}
            variant="outlined"
          >
            <Vision src={videoStreamUrl} objects={trafficSignDetections} />
          </Paper>
        </Box>
        <Box sx={{ ml: 2 }}>
          <ObjectList
            objects={trafficSignDetections}
            getImageUrl={getTrafficSignUrl}
          />
        </Box>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Action />
          <Controller />
        </Box>
      </Box>
    </>
  );
}

export default DesktopLayout;
