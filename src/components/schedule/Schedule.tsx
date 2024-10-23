import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScheduleType } from "@/types/ScheduleType";
import { getSchedule } from "@/api";
import Addschedule from "./Addschedule";
import Deleteschedule from "./Deleteschedule";

const Schedule = () => {
  const [scheduleList, setScheduleList] = useState<ScheduleType[]>([]);
  const { toast } = useToast();

  const fetchScheduleList = useCallback(async () => {
    try {
      const scheduleListData = await getSchedule();
      if (scheduleListData) {
        setScheduleList(scheduleListData.schedules);
      }
    } catch (error: unknown) {
      if (error) {
        toast({
          variant: "destructive",
          title: (error as { message: string }).message,
          description: (error as { message: string }).message,
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchScheduleList();
  }, []);

  return (
    <div>
      <div>
        <Addschedule refetch={fetchScheduleList} />
      </div>
      <div className="mt-4">
        <div>
          <p className="text-2xl font-bold">Schedule List</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {scheduleList && scheduleList.length > 0 ? (
            scheduleList.map((schedule: ScheduleType) => (
              <div key={schedule._id} className="border rounded-md p-3">
                <p>Code: {schedule.code}</p>
                <p>Room: {schedule.room}</p>
                <p>Type: {schedule.type}</p>
                <p>Date: {new Date(schedule.date).toLocaleDateString()}</p>
                <div className="border p-4 m-2">
                  <h3>Time</h3>
                  {schedule.time.map((time, index) => (
                    <div key={index}>
                      <p>Day: {time.day}</p>
                      <p>Time In: {time.timeIn}</p>
                      <p>Time Out: {time.timeOut}</p>
                    </div>
                  ))}
                </div>
                <Deleteschedule
                  roomId={schedule.room}
                  scheduleId={schedule._id}
                  refetch={fetchScheduleList}
                />
              </div>
            ))
          ) : (
            <div>No schedule</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
