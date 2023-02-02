import { Outlet } from "@tanstack/react-location";
import { FC } from "react";

import SetupLayout from "layouts/setup";

import "./setup.scss";

const SetupHome: FC = () => {
  return (
    <SetupLayout>
      {/* renders children of a route if matched */}
      <Outlet />
    </SetupLayout>
  );
};

export default SetupHome;
