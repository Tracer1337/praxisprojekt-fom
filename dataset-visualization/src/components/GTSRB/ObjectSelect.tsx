import { createElement } from "react";
import { IconButton, Box } from "@mui/material";
import { GTSRBDataset } from "../../lib/gh-content";

function ObjectSelect({
  value,
  onChange,
}: {
  value: (typeof GTSRBDataset)[number];
  onChange: (newObject: (typeof GTSRBDataset)[number]) => void;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      {GTSRBDataset.map((object) => (
        <IconButton
          color={value.objectId === object.objectId ? "primary" : undefined}
          onClick={() => onChange(object)}
          sx={{ mr: 2 }}
          key={object.objectId}
        >
          {createElement(object.icon, { fontSize: "large" })}
        </IconButton>
      ))}
    </Box>
  );
}

export default ObjectSelect;
