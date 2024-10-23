import { ScheduleType } from "./ScheduleType";

export interface RoomType {
  _id: string;
  name: string;
  key: string;
  schedules: ScheduleType[];
}
