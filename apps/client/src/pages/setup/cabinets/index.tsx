import { Outlet } from "@tanstack/react-location";

import { Cabinets } from "features/setup/cabinets";
import { useToggles } from "lib/store";

import "./cabinet.scss";

export const CabinetsPage = () => {
  const toggles = useToggles();

  console.log("run");

  if (toggles.view === "table") {
    return (
      <>
        {/* Modal rendering */}
        <Outlet />
        <Cabinets />
      </>
    );
  }

  return null;
};

export default CabinetsPage;
