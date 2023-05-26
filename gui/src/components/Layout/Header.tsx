import { AppBar, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";

function Header() {
  return (
    <AppBar
      sx={{
        position: "fixed",
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Praxisprojekt - Entwicklung eines Fahrassistenzsystems
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
