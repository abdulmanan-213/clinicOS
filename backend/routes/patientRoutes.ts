import express from "express";
import {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  logSymptoms,
  getSymptoms,
} from "../controllers/patientController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("patient"));

// Patient Profile
router.post("/profile", createPatientProfile);
router.get("/profile/:userId", getPatientProfile);
router.put("/profile/:userId", updatePatientProfile);

// Symptom Log
router.post("/symptoms", logSymptoms);
router.get("/symptoms", getSymptoms);

export default router;
