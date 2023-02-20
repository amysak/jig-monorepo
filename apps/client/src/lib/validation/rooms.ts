import { z } from "zod";

const roomTabs = [
  "summary",
  "cabinets",
  "panels",
  "accessory",
  "upcharges",
] as const;

export type RoomTab = (typeof roomTabs)[number];

export const roomParamsSchema = z.object({
  roomId: z.coerce.number(),
});

export const roomsSearchSchema = z.object({
  tabName: z.enum(roomTabs).optional().catch("summary"),
});
