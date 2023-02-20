import { client as _client } from "./http";
import * as auth from "./routes/auth";
import * as cabinets from "./routes/cabinets";
import * as clients from "./routes/clients";
import * as equipment from "./routes/equipment";
import * as finishes from "./routes/finishes";
import * as hardwareSets from "./routes/hardware-sets";
import * as jobs from "./routes/jobs";
import * as markups from "./routes/markups";
import * as materialSets from "./routes/material-sets";
import * as materials from "./routes/materials";
import * as models from "./routes/models";
import * as panels from "./routes/panels";
import * as profiles from "./routes/profiles";
import * as rooms from "./routes/rooms";
import * as terms from "./routes/terms";
import * as toes from "./routes/toes";
import * as upcharges from "./routes/upcharges";
import * as users from "./routes/users";
// import * as reports from "./routes/reports";

export const api = {
  auth,
  cabinets,
  clients,
  equipment,
  finishes,
  jobs,
  materials,
  markups,
  models,
  profiles,
  // reports,
  panels,
  rooms,
  terms,
  toes,
  upcharges,
  users,
  materialSets,
  hardwareSets,
  _client,
};
