import { z } from "zod";
import { toggleStore } from "lib/store";

export const paginationSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(toggleStore.setup.recordLimit),
});
