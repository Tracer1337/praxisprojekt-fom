import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Praxisprojekt - Entwicklung eines Fahrassistenzsystems
        </Typography>
        <Button color="inherit" size="small" href="/">
          Zum SunFounder Frontend
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
