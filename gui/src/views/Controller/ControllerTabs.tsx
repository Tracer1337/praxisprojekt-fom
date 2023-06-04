import React from "react";
import { Tabs, Tab } from "@mui/material";
import useControllerState from "../../components/Controller/hooks/useControllerState";

function ControllerTabs({
  tab,
  onChange,
}: {
  tab: number;
  onChange: (event: React.SyntheticEvent, tab: number) => void;
}) {
  const controller = useControllerState();

  return (
    <Tabs value={tab} onChange={onChange} centered sx={{ mb: 2 }}>
      <Tab label="Custom" />
      <Tab
        label="SunFounder"
        disabled={!controller.state?.sunfounderAvailable}
      />
    </Tabs>
  );
}

export default ControllerTabs;
