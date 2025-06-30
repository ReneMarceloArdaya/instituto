import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(5000),
  isFree: z.boolean().default(false).optional(),

});