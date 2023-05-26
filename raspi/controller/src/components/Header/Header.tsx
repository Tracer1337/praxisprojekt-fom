import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Praxisprojekt - Entwicklung eines Fahrassistenzsystems
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
