import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { deleteRoom } from "@/api";

interface DeleteroomProps {
  id: string;
  refetch: () => Promise<void>;
}

const Deleteroom = ({ id, refetch }: DeleteroomProps) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deleteRoom(id);
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
      <Button onClick={handleDelete}>Delete Room</Button>
    </div>
  );
};

export default Deleteroom;
