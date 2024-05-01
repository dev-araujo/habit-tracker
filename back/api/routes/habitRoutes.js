const express = require("express");
const {
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

const router = express.Router();

router.get("/", getHabits);
router.post("/", addHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

module.exports = router;
