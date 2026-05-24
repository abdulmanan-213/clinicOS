import express from "express";
import {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorProfileController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("doctor"));

// Doctor Profile
router.post("/profile", createDoctorProfile);
router.get("/profile/:userId", getDoctorProfile);
router.put("/profile/:userId", updateDoctorProfile);

export default router;
