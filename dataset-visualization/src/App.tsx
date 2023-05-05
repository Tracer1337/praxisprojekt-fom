import { CssBaseline, Typography, Container, Box } from "@mui/material";
import GTSDB from "./components/GTSDB";

function App() {
  return (
    <CssBaseline>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2">Praxisprojekt</Typography>
        <Typography>Entwicklung eines Fahrassistenzsystems</Typography>
        <Box sx={{ mt: 8 }}>
          <GTSDB />
        </Box>
      </Container>
    </CssBaseline>
  );
}

export default App;
