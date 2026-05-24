import express from "express";
import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
router.use(protect);

router.post("/", createReminder);
router.get("/", getAllReminders);
router.get("/:id", getReminderById);
router.put("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
