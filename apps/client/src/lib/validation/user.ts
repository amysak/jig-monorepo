import { z } from "zod";

const userTabs = [
  // user.preferences
  "preferences",
  // User info, company info, update password, image, etc.
  "info",
] as const;

export type UserTab = (typeof userTabs)[number];

export const userSearchSchema = z.object({
  tabName: z.enum(userTabs).optional().catch("preferences"),
});
