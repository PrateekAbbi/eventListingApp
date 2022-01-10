const express = require("express");
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleWares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getEvents);
router.route("/create").post(protect, createEvent);
router
  .route("/:id")
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
