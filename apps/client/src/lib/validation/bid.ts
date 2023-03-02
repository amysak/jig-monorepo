import { z } from "zod";

export const bidSearchSchema = z.object({
  // step: z.enum(bidSteps).optional().catch("select-client"),
});
