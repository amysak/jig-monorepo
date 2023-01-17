import { ObjectValues } from "../util";

export const DASHBOARD_ENTITIES = {
  CLIENT: "client",
  JOB: "job",
  REVENUE: "revenue",
} as const;

export type DashboardEntities = ObjectValues<typeof DASHBOARD_ENTITIES>;
