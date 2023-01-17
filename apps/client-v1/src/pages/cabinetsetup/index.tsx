import React from "react";
import { Navigate, Route } from "react-router-dom";

import { shortId } from "../../utilities/utils";
import "./cabinetsetup.scss";

import CabinetPage from "./cabinets/";
import CabinetList from "./cabinets/CabinetList";

import DoorDrawer from "./door-drawers/DoorDrawer";
import DoorDrawerList from "./door-drawers/DoorDrawerList";

import DoorDrawerProfile from "./door-profiles/DoorDrawerProfile";
import DoorDrawerProfilesList from "./door-profiles/DoorDrawerProfilesList";

import AccessoriesHardwareList from "./accessories-hardwares/AccessoriesHardwareList";
import AccessoryHardware from "./accessories-hardwares/AccessoryHardware";

import TrimMolding from "./trim-moldings/TrimMolding";
import TrimMoldingList from "./trim-moldings/TrimMoldingList";

import Material from "./materials/Material";
import MaterialList from "./materials/MaterialList";

import Finishes from "./finishes/Finishes";
import FinishesList from "./finishes/FinishesList";

import Laborrate from "./laborrates/Laborrate";
import LaborRatesList from "./laborrates/LaborRatesList";

const routes = [
  {
    path: "/",
    component: () => <Navigate to="/cabinet-setup/cabinets" />,
    exact: true,
  },
  {
    path: "/cabinets",
    component: CabinetList,
    exact: true,
  },
  {
    path: "/cabinets/:id/:cabinetTab?",
    component: CabinetPage,
    exact: true,
  },
  {
    path: "/door-drawers",
    component: DoorDrawerList,
    exact: true,
  },
  {
    path: "/door-drawers/:id",
    component: DoorDrawer,
    exact: true,
  },
  {
    path: "/door-drawer-profiles",
    component: DoorDrawerProfilesList,
    exact: true,
  },
  {
    path: "/door-drawer-profiles/:id",
    component: DoorDrawerProfile,
    exact: true,
  },
  {
    path: "/accessories-hardwares",
    component: AccessoriesHardwareList,
    exact: true,
  },
  {
    path: "/accessories-hardwares/:id",
    component: AccessoryHardware,
    exact: true,
  },
  {
    path: "/trim-moldings",
    component: TrimMoldingList,
    exact: true,
  },
  {
    path: "/trim-moldings/:id",
    component: TrimMolding,
    exact: true,
  },
  {
    path: "/materials",
    component: MaterialList,
    exact: true,
  },
  {
    path: "/materials/:id",
    component: Material,
    exact: true,
  },
  {
    path: "/finishes",
    component: FinishesList,
    exact: true,
  },
  {
    path: "/finishes/:id",
    component: Finishes,
    exact: true,
  },
  {
    path: "/labor-rates",
    component: LaborRatesList,
    exact: true,
  },
  {
    path: "/labor-rates/:id",
    component: Laborrate,
    exact: true,
  },
];

function CabinetSetupPage() {
  return (
    <>
      {routes.map((route) => (
        <Route
          {...route}
          key={shortId()}
          path={`/cabinet-setup${route.path}`}
        />
      ))}
    </>
  );
}

export default CabinetSetupPage;
