import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import scheduleSchema from "@/zod/scheduleSchema";
import { addSchedule } from "@/api";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddscheduleProps {
  refetch: () => Promise<void>;
}

const Addschedule = ({ refetch }: AddscheduleProps) => {
  const { toast } = useToast();

  const [day, setDay] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [time, setTime] = useState([{ day: "", timeIn: "", timeOut: "" }]);

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      code: 0,
      title: "",
      room: "",
      type: "",
      date: `${new Date().toISOString().slice(0, 10)}`,
    },
  });

  const onSubmit = async (data: z.infer<typeof scheduleSchema>) => {
    try {
      const scheduleData = {
        ...data,
        time: time,
      };
      const result = await addSchedule(scheduleData);
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

  const handleAddTime = async () => {
    if (day && timeIn && timeOut) {
      setTime([...time, { day, timeIn, timeOut }]);
      setDay("");
      setTimeIn("");
      setTimeOut("");
    } else {
      toast({
        variant: "destructive",
        title: "error adding time",
      });
    }
  };

  const handleDeleteTime = (index: number) => {
    setTime(time.filter((_, i) => i !== index));
  };

  const handleEditTime = (index: number) => {
    const timeItem = time[index];

    refetch();
    handleDeleteTime(index);
    setDay(timeItem.day);
    setTimeIn(timeItem.timeIn);
    setTimeOut(timeItem.timeOut);
  };

  return (
    <div className="border rounded-lg  p-4">
      <div>
        <p className="text-2xl font-bold">Add Schedule</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Code</FormLabel>
                <FormControl>
                  <Input placeholder="456098123" {...field} />
                </FormControl>
                <FormDescription>
                  Code that will be used to unlock the device
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Mapeh" {...field} />
                </FormControl>
                <FormDescription>Title of the Schedule</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Room _id</FormLabel>
                <FormControl>
                  <Input placeholder="67186b6a6a517a5001fe07ec" {...field} />
                </FormControl>
                <FormDescription>Enter the Room _id from above</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Type</FormLabel>
                <FormControl>
                  <Input placeholder="regular" {...field} />
                </FormControl>
                <FormDescription>
                  Either "regular" or "exception", regular - for recurring
                  schedule, exception - for one time schedule
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  This date is used for "exception" type
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center gap-4 border p-4 rounded-lg">
            <div>This time is used for "regular"</div>
            <div className="flex items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Select a Day
              </Label>
              <Select value={day} onValueChange={(value) => setDay(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-evenly gap-4">
              <div className="flex items-center w-full gap-4">
                <Label>Time_In</Label>
                <Input
                  id="timein"
                  type="time"
                  value={timeIn}
                  className="col-span-3"
                  onChange={(e) => setTimeIn(e.target.value)}
                />
              </div>

              <div className="flex items-center w-full gap-4">
                <Label>Time_Out</Label>
                <Input
                  id="timeout"
                  type="time"
                  value={timeOut}
                  className="col-span-3"
                  onChange={(e) => setTimeOut(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button type="button" onClick={handleAddTime}>
                Add Time
              </Button>
            </div>
            <div>
              <p>Time</p>
              {time.length === 0 ? (
                <p>No time added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {time.map((time, index) => (
                    <div key={index}>
                      <div className="border p-4 relative rounded-lg">
                        <div onClick={() => handleEditTime(index)}>
                          <p>
                            {time.day.charAt(0).toUpperCase() +
                              time.day.slice(1)}{" "}
                          </p>
                          <p>
                            {time.timeIn} - {time.timeOut}
                          </p>
                        </div>
                        <div
                          className="absolute flex justify-center items-center top-0 right-0 h-6 w-6 m-1 hover:scale-125 z-50"
                          onClick={() => handleDeleteTime(index)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Addschedule;
