import { CssBaseline, Box, Paper } from "@mui/material";
import { getTrafficSignUrl, videoStreamURL } from "./lib/raspi";
import Header from "./components/Header";
import VideoStream from "./components/VideoStream";
import ObjectList from "./components/ObjectList";
import Controller from "./components/Controller";
import Action from "./components/Action";

function App() {
  const testObjects = [
    {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      class: 14,
      name: "stop",
    },
  ];

  return (
    <CssBaseline>
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
            <VideoStream src={videoStreamURL} alt="Video Stream" />
          </Paper>
        </Box>
        <Box sx={{ gridColumn: 3, ml: 2 }}>
          <ObjectList objects={testObjects} getImageUrl={getTrafficSignUrl} />
        </Box>
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Action />
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Controller />
          </Paper>
        </Box>
      </Box>
    </CssBaseline>
  );
}

export default App;
