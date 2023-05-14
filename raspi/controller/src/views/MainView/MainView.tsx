import { Box, Paper } from "@mui/material";
import Header from "../../components/Header";
import VideoStream from "../../components/VideoStream";
import ObjectList from "../../components/ObjectList";
import Controller from "../../components/Controller";
import Action from "../../components/Action";
import { useRaspiConfig } from "../../lib/raspi";

function MainView() {
  const { videoStreamUrl, getTrafficSignUrl } = useRaspiConfig();

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Header />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 800px 1fr",
          gridTemplateRows: "480px",
          mb: 4,
        }}
      >
        <Box sx={{ gridColumn: 2 }}>
          <Paper
            sx={{ display: "flex", justifyContent: "center" }}
            variant="outlined"
          >
            <VideoStream src={videoStreamUrl} alt="Video Stream" />
          </Paper>
        </Box>
        <Box sx={{ gridColumn: 3, ml: 2 }}>
          <ObjectList objects={[]} getImageUrl={getTrafficSignUrl} />
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

export default MainView;
