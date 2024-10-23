export interface ScheduleType {
  _id: string;
  code: number;
  title: string;
  room: string;
  type: string;
  date: string;
  time: [{ day: string; timeIn: string; timeOut: string }];
}
