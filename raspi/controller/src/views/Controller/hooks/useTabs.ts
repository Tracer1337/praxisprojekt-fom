import { useNavigate, useMatches } from "react-router-dom";
import { SyntheticEvent } from "react";

function useTabs(tabs: string[]) {
  const navigate = useNavigate();

  const matches = useMatches();

  const subpath = matches[matches.length - 2].pathname;
  const path = matches[matches.length - 1].pathname;

  const pathParts = path.split("/");
  const tab = tabs.indexOf(pathParts[pathParts.length - 1]);

  const handleChange = (_event: SyntheticEvent, tab: number) => {
    navigate(`${subpath}/${tabs[tab]}`);
  };

  return { tab, handleChange };
}

export default useTabs;
