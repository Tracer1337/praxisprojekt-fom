import { ReactNode } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  const navigate = useNavigate();
  const isActive = useMatch(to);

  return (
    <ListItem
      disablePadding
      sx={{ backgroundColor: isActive ? "#cacaca" : null }}
    >
      <ListItemButton onClick={() => navigate(to)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListLink;
