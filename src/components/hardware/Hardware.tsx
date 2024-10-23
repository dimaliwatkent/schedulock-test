import { getHardwareRoom } from "@/api";
import { RoomType } from "@/types/RoomType";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const Hardware = () => {
  const [hardwareRoomList, setHardwareRoomList] = useState<RoomType[]>([]);
  const { toast } = useToast();

  const fetchHardwareRoomList = useCallback(async () => {
    try {
      const hardwareRoomListData = await getHardwareRoom();
      if (hardwareRoomListData) {
        setHardwareRoomList(hardwareRoomListData.rooms);
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
    fetchHardwareRoomList();
  }, []);

  return (
    <div>
      <div className="mt-4">
        <div>
          <p className="text-2xl font-bold">Data that Hardware will Receive</p>
          <p>
            Can be access through{" "}
            <code>{`/.netlify/functions/api/rooms/device/:roomId?key=<key here>`}</code>
          </p>

          <p>
            Example:{" "}
            <code>{`/.netlify/functions/api/rooms/device/67188ac1e779093ca8dd0f00?key=123abc`}</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {hardwareRoomList && hardwareRoomList.length > 0 ? (
            hardwareRoomList.map((room: RoomType) => (
              <div key={room._id} className="border rounded-md p-3">
                <p>
                  Room _id: <span>{room._id}</span>
                </p>
                <p>
                  Room Name: <span>{room.name}</span>
                </p>

                <p>
                  Key: <span>{room.key}</span>
                </p>
                <h3>Schedules</h3>
                {room.schedules.map((schedule, index) => (
                  <div key={index}>
                    <h4>Code: {schedule.code}</h4>
                    <h4>Title: {schedule.title}</h4>
                    <h4>Type: {schedule.type}</h4>
                    <h4>
                      Date: {new Date(schedule.date).toLocaleDateString()}
                    </h4>
                    <div className="border p-4 m-2">
                      <h4>Time</h4>
                      {schedule.time?.map((time, index) => (
                        <div key={index}>
                          <p>
                            Day:
                            {time.day.toString()}
                          </p>
                          <p>Time In: {time.timeIn.toString()}</p>
                          <p>Time Out: {time.timeOut.toString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No room</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hardware;
