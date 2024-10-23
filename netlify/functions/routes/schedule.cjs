const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.cjs");
const Room = require("../models/room.cjs");

// retrieve all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).send({ schedules });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error retrieving schedules", error: error });
  }
});

// add schedule
router.post("/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { code, title, type, date, time } = req.body;
    console.log(date);

    // Validate date
    if (!date) {
      return res.status(400).send({ message: "Date is required" });
    }

    // Validate time
    if (!time || !Array.isArray(time) || time.length === 0) {
      return res
        .status(400)
        .send({ message: "Time is required and must be an array" });
    }

    const schedule = new Schedule({
      code,
      title,
      type,
      date,
      time,
      room: roomId,
    });

    // Find the room and update its schedules array
    const roomToUpdate = await Room.findById(roomId);
    if (!roomToUpdate) {
      return res.status(404).send({ message: "Room not found" });
    }
    roomToUpdate.schedules.push(schedule._id);
    await roomToUpdate.save();

    await schedule.save();

    res.status(201).send({ schedule });
  } catch (error) {
    res.status(400).send({ message: "Error creating schedule" });
  }
});

// delete schedule by roomId and scheduleId
router.delete("/:roomId/:scheduleId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const scheduleId = req.params.scheduleId;

    // Find the room
    const roomToUpdate = await Room.findById(roomId);
    if (!roomToUpdate) {
      return res.status(404).send({ message: "Room not found" });
    }

    // Check if the schedule belongs to the room
    if (!roomToUpdate.schedules.includes(scheduleId)) {
      return res
        .status(400)
        .send({ message: "Schedule does not belong to the room" });
    }

    // Remove the schedule from the room's schedules array
    roomToUpdate.schedules = roomToUpdate.schedules.filter(
      (schedule) => schedule.toString() !== scheduleId,
    );
    await roomToUpdate.save();

    // Delete the schedule
    await Schedule.findByIdAndDelete(scheduleId);

    res.status(200).send({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error deleting schedule", error: error });
  }
});

module.exports = router;
