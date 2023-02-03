import { client as _client } from "./http";
import * as accounts from "./routes/accounts";
import * as auth from "./routes/auth";
import * as cabinets from "./routes/cabinets";
import * as clients from "./routes/clients";
import * as equipment from "./routes/equipment";
import * as fillers from "./routes/fillers";
import * as finishes from "./routes/finishes";
import * as jobs from "./routes/jobs";
import * as markups from "./routes/markups";
import * as materials from "./routes/materials";
import * as openings from "./routes/openings";
import * as panels from "./routes/panels";
import * as profiles from "./routes/profiles";
import * as rooms from "./routes/rooms";
import * as terms from "./routes/terms";
import * as toes from "./routes/toes";
import * as upcharges from "./routes/upcharges";
import * as materialSets from "./routes/material-sets";
import * as hardwareSets from "./routes/hardware-sets";
// import * as reports from "./routes/reports";

export const api = {
  accounts,
  auth,
  cabinets,
  clients,
  equipment,
  finishes,
  fillers,
  jobs,
  materials,
  markups,
  openings,
  profiles,
  // reports,
  panels,
  rooms,
  terms,
  toes,
  upcharges,
  materialSets,
  hardwareSets,
  _client,
};
