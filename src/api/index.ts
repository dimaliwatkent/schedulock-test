// src/api/index.js

import axios from "axios";

interface ScheduleProps {
  time: { day: string; timeIn: string; timeOut: string }[];
  code: number;
  title: string;
  type: string;
  room: string;
  date?: string | undefined;
}

interface RoomProps {
  key: string;
  name: string;
}

const api = axios.create({
  baseURL: "https://schedulock-test.netlify.app/.netlify/functions/api",
});

//rooms
const getRoom = async () => {
  const response = await api.get(`/room/`);
  return response.data;
};

// const getRoomById = async (roomId, key) => {
//   const response = await api.get(`/room/${roomId}?key=${key}`);
//   return response.data;
// };

const addRoom = async (roomForm: RoomProps) => {
  const response = await api.post(`/room/`, roomForm);
  return response.data;
};

const deleteRoom = async (roomId: string) => {
  const response = await api.delete(`/room/${roomId}`);
  return response.data;
};

// schedule
const getSchedule = async () => {
  const response = await api.get(`/schedule/`);
  return response.data;
};

const addSchedule = async (scheduleForm: ScheduleProps) => {
  const response = await api.post(
    `/schedule/${scheduleForm.room}`,
    scheduleForm,
  );
  return response.data;
};

const deleteSchedule = async ({
  roomId,
  scheduleId,
}: {
  roomId: string;
  scheduleId: string;
}) => {
  const response = await api.delete(`/schedule/${roomId}/${scheduleId}`);
  return response.data;
};

const getHardwareRoom = async () => {
  const response = await api.get(`/room/device`);
  return response.data;
};

export {
  getRoom,
  // getRoomById,
  addRoom,
  deleteRoom,
  getSchedule,
  addSchedule,
  deleteSchedule,
  getHardwareRoom,
};
