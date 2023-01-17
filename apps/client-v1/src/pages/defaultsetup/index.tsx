import React from "react";
import { Navigate, Route } from "react-router-dom";

import { shortId } from "../../utilities/utils";

import TermsList from "./terms";
import Term from "./terms/Term";

import MarkupList from "./markups";
import Markup from "./markups/Markup";

import CabinetSpecification from "./cabinet-specification";
import HardwareList from "./hardwares";
import Hardware from "./hardwares/Hardware";
import LetterList from "./letters";
import Letter from "./letters/Letter";
import MaterialList from "./materials";
import Material from "./materials/Material";

const routes = [
  {
    path: "/",
    component: () => <Navigate to="/default-setup/terms" />,
    exact: true,
  },
  {
    path: "/terms",
    component: TermsList,
    exact: true,
  },
  {
    path: "/terms/:termId",
    component: Term,
    exact: true,
  },
  {
    path: "/markups",
    component: MarkupList,
    exact: true,
  },
  {
    path: "/markups/:id",
    component: Markup,
    exact: true,
  },
  {
    path: "/materials",
    component: MaterialList,
    exact: true,
  },
  {
    path: "/materials/:id/:tab?",
    component: Material,
    exact: false,
  },
  {
    path: "/hardwares",
    component: HardwareList,
    exact: true,
  },
  {
    path: "/hardwares/:id",
    component: Hardware,
    exact: true,
  },
  {
    path: "/letters",
    component: LetterList,
    exact: true,
  },
  {
    path: "/letters/:id",
    component: Letter,
    exact: true,
  },
  {
    path: "/cabinet-specifications",
    component: CabinetSpecification,
    exact: true,
  },
];

function DefaultSetupPage() {
  return (
    <>
      {routes.map((route) => (
        <Route
          {...route}
          key={shortId()}
          path={`/default-setup${route.path}`}
        />
      ))}
    </>
  );
}

export default DefaultSetupPage;
