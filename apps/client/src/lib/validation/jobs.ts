import { z } from "zod";
import { paginationSchema } from "./pagination";

const jobTabs = ["info", "client", "rooms", "notes"] as const;

export type JobTab = (typeof jobTabs)[number];

export const jobParamsSchema = z.object({
  // TODO: Need to find a way to redirect if jobId is null
  jobId: z.coerce.number().nonnegative().int(),
});

export const jobsSearchSchema = z.object({
  pagination: paginationSchema.optional(),
});

export const jobSearchSchema = z.object({
  tabName: z.enum(jobTabs).optional().catch("info"),
});
