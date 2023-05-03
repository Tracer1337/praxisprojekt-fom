import { CssBaseline, Typography, Container, Box } from "@mui/material";
import GTSDB from "./components/GTSDB";
import GTSRB from "./components/GTSRB";

function App() {
  return (
    <CssBaseline>
      <Container sx={{ mt: 4, mb: 16 }}>
        <Typography variant="h2">Praxisprojekt</Typography>
        <Typography>Entwicklung eines Fahrassistenzsystems</Typography>
        <Box sx={{ mt: 8 }}>
          <GTSDB />
        </Box>
        <Box sx={{ mt: 8 }}>
          <GTSRB />
        </Box>
      </Container>
    </CssBaseline>
  );
}

export default App;
