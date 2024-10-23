import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import roomSchema from "@/zod/roomSchema";
import { addRoom } from "@/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AddroomProps {
  refetch: () => Promise<void>;
}

const Addroom = ({ refetch }: AddroomProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      key: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof roomSchema>) => {
    try {
      const result = await addRoom(data);
      refetch();
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(result, null, 2)}
            </code>
          </pre>
        ),
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
    <div className="border rounded-lg  p-4">
      <div>
        <p className="text-2xl font-bold">Add Room</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Com Lab 1" {...field} />
                </FormControl>
                <FormDescription>Name of the Room</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Key</FormLabel>
                <FormControl>
                  <Input placeholder="1m2D+Z9c8O8" {...field} />
                </FormControl>
                <FormDescription>
                  String that will be used to authenticate the device
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Addroom;
