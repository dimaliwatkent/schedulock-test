import { z } from "zod";

const scheduleSchema = z.object({
  code: z.coerce.number(),
  title: z.string().min(1, "Title is required"),
  // user: z.string().min(1, "User is required"),
  room: z.string(),
  type: z.string(),
  date: z.string().optional(),
});

export default scheduleSchema;
