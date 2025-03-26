const express = require("express");
const router = express.Router();
const {
  addMeeting,
  getGroupMeetings,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meeting");
const { protect } = require("../middleware/auth");

// Routes
router.post("/new", protect, addMeeting);
router.get("/:groupId", protect, getGroupMeetings);
router.put("/:meetingId", protect, updateMeeting);
router.delete("/:meetingId", protect, deleteMeeting);

module.exports = router;
