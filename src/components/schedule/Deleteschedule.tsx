import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { deleteSchedule } from "@/api";

interface DeletescheduleProps {
  roomId: string;
  scheduleId: string;
  refetch: () => Promise<void>;
}

const Deleteschedule = ({
  roomId,
  scheduleId,
  refetch,
}: DeletescheduleProps) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deleteSchedule({ roomId, scheduleId });
      refetch();
      toast({
        title: "successfully deleted",
      });
    } catch (error: unknown) {
      if (error) {
        toast({
          variant: "destructive",
          title: (error as { message: string }).message,
          description: (error as { message: string }).message,
        });
      }
    }
  };
  return (
    <div>
      <Button onClick={handleDelete}>Delete Schedule</Button>
    </div>
  );
};

export default Deleteschedule;
