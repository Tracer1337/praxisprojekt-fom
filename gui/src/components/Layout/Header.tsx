import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Praxisprojekt - Entwicklung eines Fahrassistenzsystems
        </Typography>
        <a href="https://github.com/Tracer1337/praxisprojekt-fom">
          <IconButton sx={{ color: "white" }}>
            <GitHubIcon />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
