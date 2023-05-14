import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { WebsocketContextProvider } from "./lib/websocket.ts";
import { RaspiContextProvider, getRaspiConfig } from "./lib/raspi.ts";
import RaspiConfigForm from "./components/RaspiConfigForm/RaspiConfigForm.tsx";
import MainView from "./views/MainView/MainView.tsx";

function App() {
  const [raspiHost, setRaspiHost] = useState<string>();

  if (!raspiHost) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper variant="outlined" sx={{ width: 500, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Raspberry-Pi Controller
          </Typography>
          <RaspiConfigForm onSubmit={(data) => setRaspiHost(data.host)} />
        </Paper>
      </Box>
    );
  }

  return (
    <RaspiContextProvider host={raspiHost}>
      <WebsocketContextProvider url={getRaspiConfig(raspiHost).websocketUrl}>
        <MainView />
      </WebsocketContextProvider>
    </RaspiContextProvider>
  );
}

export default App;
