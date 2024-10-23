import { getRoom } from "@/api";
import { RoomType } from "@/types/RoomType";
import { useEffect, useState, useCallback } from "react";
import Addroom from "./Addroom";
import { useToast } from "@/hooks/use-toast";
import Deleteroom from "./Deleteroom";

const Room = () => {
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const { toast } = useToast();

  const fetchRoomList = useCallback(async () => {
    try {
      const roomListData = await getRoom();
      if (roomListData) {
        setRoomList(roomListData.rooms);
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
    fetchRoomList();
  }, []);

  return (
    <div>
      <div>
        <Addroom refetch={fetchRoomList} />
      </div>

      <div className="mt-4">
        <div>
          <p className="text-2xl font-bold">Room List</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {roomList && roomList.length > 0 ? (
            roomList.map((room: RoomType) => (
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
                <Deleteroom id={room._id} refetch={fetchRoomList} />
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

export default Room;
