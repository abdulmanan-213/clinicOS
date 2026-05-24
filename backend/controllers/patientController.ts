import { Response } from "express";
import PatientProfile from "../models/patientProfileSchema";
import SymptomLog from "../models/symptomLogSchema";
import { AuthRequest } from "../middleware/authMiddleware";

// Create Profile
export const createPatientProfile = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await PatientProfile.findOne({ userId: req.user?._id });
    if (existing)
      return res.status(400).json({ message: "Profile already exists" });

    const profile = await PatientProfile.create({
      ...req.body,
      userId: req.user?._id,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Profile
export const getPatientProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updatePatientProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    Object.assign(profile, req.body);
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Log Symptoms
export const logSymptoms = async (req: AuthRequest, res: Response) => {
  try {
    const log = await SymptomLog.create({
      ...req.body,
      patientId: req.user?._id,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Symptoms
export const getSymptoms = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await SymptomLog.find({ patientId: req.user?._id });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
