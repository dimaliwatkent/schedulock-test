const express = require("express");
const router = express.Router();
const Room = require("../models/room.cjs");

// Add Room
router.post("/", async (req, res) => {
  try {
    const { name, key } = req.body;
    console.log(name, key);
    const room = new Room({ name, key });
    await room.save();
    res.json({ message: "Room added", room: room });
  } catch (error) {
    res.status(400).json({ error: "Failed to add room" });
  }
});

// Get all rooms
router.get("/", async (req, res) => {
  try {
    // const rooms = await Room.find().populate("schedules");
    const rooms = await Room.find();
    res.send({ rooms });
  } catch (error) {
    res.status(400).send({ message: "Error getting rooms", error: error });
  }
});

// Get all rooms
router.get("/device", async (req, res) => {
  try {
    const rooms = await Room.find().populate("schedules");
    res.send({ rooms });
  } catch (error) {
    res.status(400).send({ message: "Error getting rooms", error: error });
  }
});

// Get Room by ID
router.get("/device/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const key = req.query.key;
    const room = await Room.findById(id).populate("schedules");

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.key !== key) {
      return res.status(401).json({ error: "Invalid key" });
    }

    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove Room
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Room.findByIdAndDelete(id);
    res.json({ message: "Room removed successfully" });
  } catch (error) {
    res.status(404).json({ error: "Room not found" });
  }
});

module.exports = router;
