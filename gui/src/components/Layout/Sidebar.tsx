import { Drawer, Toolbar, Divider, List } from "@mui/material";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ImageIcon from "@mui/icons-material/Image";
import { DRAWER_WIDTH } from "./constants";
import ListLink from "./ListLink";

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListLink
          to="/controller/custom"
          label="Controller"
          icon={<GamepadIcon />}
        />
        <ListLink to="/dataset" label="Datensatz" icon={<ImageIcon />} />
      </List>
    </Drawer>
  );
}

export default Sidebar;
