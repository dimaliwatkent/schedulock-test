import { z } from "zod";

const roomSchema = z.object({
  name: z.string().min(1, "Room Name is required"),
  key: z.string().min(5, "Key is required, min of 5 characters"),
});

export default roomSchema;
