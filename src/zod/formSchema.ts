import { z } from "zod";

const dayEnum = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

const timeSchema = z.object({
  day: dayEnum,
  timeIn: z.string().min(1, "Time In is required"),
  timeOut: z.string().min(1, "Time Out is required"),
});

const typeEnum = z.enum(["regular", "exception"]);

const formSchema = z.object({
  code: z.coerce
    .number()
    .int("Code must be an integer")
    .positive("Code must be a positive integer"),
  // key: z.string().min(1, "Key is required"),
  title: z.string().min(1, "Title is required"),
  user: z.string().min(1, "User is required"),
  room: z.string().min(1, "Room is required"),
  type: typeEnum,
  date: z.string(),
  time: z.array(timeSchema).min(1, "At least one time entry is required"),
});

export default formSchema;
