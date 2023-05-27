import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

function ListLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: ReactNode;
}) {
  const theme = useTheme();

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        backgroundColor: isActive ? theme.palette.grey[300] : "unset",
        textDecoration: "none",
        display: "block",
      })}
    >
      <ListItem disablePadding sx={{ color: "initial" }}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default ListLink;
