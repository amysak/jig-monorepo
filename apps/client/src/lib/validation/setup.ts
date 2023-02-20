import {
  CABINET_EXTENSION_CATEGORY,
  CABINET_TYPES,
  PROFILE_TYPE,
} from "type-defs";
import { z } from "zod";
import { paginationSchema } from "./pagination";

export const setupSearchSchema = z.object({
  pagination: paginationSchema.optional(),
  search: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
});

export const setupParamsSchema = z.object({
  id: z.coerce.number(),
});

export const cabinetSearchSchema = z.object({
  filters: z
    .object({
      type: z.enum(CABINET_TYPES).optional(),
    })
    .optional(),
});

export const profilesSearchSchema = z.object({
  type: z.enum(PROFILE_TYPE).optional(),
});

export const extensionsParamsSchema = z.object({
  extensionCategory: z.enum(CABINET_EXTENSION_CATEGORY),
});

export const setsParamsSchema = z.object({
  setType: z.enum(["material", "hardware"]),
});
