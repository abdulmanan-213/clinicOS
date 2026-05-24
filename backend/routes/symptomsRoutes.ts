import express from "express";
import {
  createSymptomLog,
  getAllSymptomLogs,
  getSymptomLogById,
  updateSymptomLog,
  deleteSymptomLog,
} from "../controllers/symptomsController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();
router.use(protect);

router.post("/", createSymptomLog);
router.get("/", getAllSymptomLogs);
router.get("/:id", getSymptomLogById);
router.put("/:id", updateSymptomLog);
router.delete("/:id", deleteSymptomLog);

export default router;
