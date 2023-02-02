import { client as _client } from "./http";
import * as accounts from "./routes/accounts";
import * as auth from "./routes/auth";
import * as cabinets from "./routes/cabinets";
import * as clients from "./routes/clients";
import * as jobs from "./routes/jobs";
import * as openings from "./routes/openings";
import * as profiles from "./routes/profiles";
import * as rooms from "./routes/rooms";
import * as terms from "./routes/terms";
// import * as reports from "./routes/reports";

export const api = {
  accounts,
  auth,
  cabinets,
  clients,
  jobs,
  openings,
  profiles,
  // reports,
  rooms,
  terms,
  _client,
};
