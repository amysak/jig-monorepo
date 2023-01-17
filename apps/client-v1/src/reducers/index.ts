import { baseApi } from "api/rtkq";

import userReducer from "./users/user";

import jobReducer from "./jobs/job";
import jobsReducer from "./jobs/jobs";

import clientReducer from "./clients/client";
import clientsReducer from "./clients/clients";

import roomReducer from "./rooms/room";
import roomsReducer from "./rooms/rooms";

import accountReducer from "./accounts";

import notificationReducer from "./notification";

import termReducer from "./terms/term";
import termsReducer from "./terms/terms";

import taxReducer from "./taxes/tax";

import deliveryReducer from "./deliveries/delivery";

import markupReducer from "./markups/markup";
import markupsReducer from "./markups/markups";

import cabinetReducer from "./cabinets/cabinet";
import cabinetsReducer from "./cabinets/cabinets";
import cabinetsSetupReducer from "./cabinets/setup";
import cabinetSpecificationReducer from "./cabinets/specification";

import materialReducer from "./materials/material";
import materialsReducer from "./materials/materials";

import hardwareReducer from "./hardwares/hardware";
import hardwaresReducer from "./hardwares/hardwares";
import hardwaresSetupReducer from "./hardwares/setup";

import letterReducer from "./letters/letter";
import lettersReducer from "./letters/letters";

import doorsDrawerReducer from "./doors/doors";
import doorProfilesReducer from "./doors/profiles";

import accessoriesReducer from "./accessories/accessories";
import defaultAccessoriesReducer from "./accessories/defaultAccessories";

import defaultTrimsReducer from "./trims/defaultTrims";
import trimReducer from "./trims/trim";
import trimsReducer from "./trims/trims";

import finishesReducer from "./finishes/finishes";

import panelsReducer from "./panels/panels";
import setupPanelsReducer from "./panels/setup";

import profilesReducer from "./profiles/profiles";

import { jobTermsSlice } from "features/job/model/slice";
import { estimateProposalsSlice } from "features/Reports/model/slice";
import { clientTermsSlice } from "features/Terms/model/slice";

export const rootReducer = {
  user: userReducer,
  jobs: jobsReducer,
  job: jobReducer,
  clients: clientsReducer,
  client: clientReducer,
  rooms: roomsReducer,
  room: roomReducer,
  account: accountReducer,
  notification: notificationReducer,
  term: termReducer,
  terms: termsReducer,
  tax: taxReducer,
  delivery: deliveryReducer,
  markup: markupReducer,
  markups: markupsReducer,
  cabinets: cabinetsReducer,
  cabinet: cabinetReducer,
  cabinetSetup: cabinetsSetupReducer,
  cabinetSpecification: cabinetSpecificationReducer,
  materials: materialsReducer,
  material: materialReducer,
  hardwares: hardwaresReducer,
  hardware: hardwareReducer,
  hardwareSetup: hardwaresSetupReducer,
  letters: lettersReducer,
  letter: letterReducer,
  doorProfiles: doorProfilesReducer,
  doorsDrawers: doorsDrawerReducer,
  accessories: accessoriesReducer,
  defaultAccessories: defaultAccessoriesReducer,
  trims: trimsReducer,
  defaultTrims: defaultTrimsReducer,
  trim: trimReducer,
  finishes: finishesReducer,
  panels: panelsReducer,
  setupPanels: setupPanelsReducer,
  profiles: profilesReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [estimateProposalsSlice.name]: estimateProposalsSlice.reducer,
  [clientTermsSlice.name]: clientTermsSlice.reducer,
  [jobTermsSlice.name]: jobTermsSlice.reducer,
};
