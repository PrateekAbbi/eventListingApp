const expressAsyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

const getEvents = expressAsyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  res.json(events);
});

const createEvent = expressAsyncHandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const event = new Event({ user: req.user._id, title, body });

    const createEvent = await event.save();
    console.log(createEvent);

    res.status(201).json(createEvent);
  }
});

const getEventById = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(400).json({ message: "event not found" });
  }
});

const updateEvent = expressAsyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const event = await Event.findById(req.params.id);

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can not perform this action");
  }

  if (event) {
    (event.title = title), (event.body = body);

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const deleteEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can not perform this action");
  }

  if (event) {
    await event.remove();
    res.json({ message: "Event Removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
