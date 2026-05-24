import express from "express";
import {
  uploadReports,
  getAllReports,
  getReportById,
  deleteReport,
} from "../controllers/reportController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadCloud";

const router = express.Router();
router.use(protect);

router.post(
  "/",
  protect,
  upload.array("files", 5), // max 5 files
  uploadReports,
);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.delete("/:id", deleteReport);

export default router;
