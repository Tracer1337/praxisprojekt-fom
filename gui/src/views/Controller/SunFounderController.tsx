import { Box, Paper, Container } from "@mui/material";
import { useRaspi } from "../../lib/raspi";

function SunFounderController() {
  const raspi = useRaspi().config();

  return (
    <Container maxWidth="xl">
      <Paper variant="outlined">
        <Box
          component="iframe"
          src={raspi.sunfounderUrl}
          sx={{
            display: "block",
            width: "100%",
            height: "calc(100vh - 200px)",
            border: "none",
          }}
        />
      </Paper>
    </Container>
  );
}

export default SunFounderController;
