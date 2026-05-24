import { Request, Response } from "express";
import DoctorProfile from "../models/doctorProfileSchema";

// CREATE
export const createDoctorProfile = async (req: Request, res: Response) => {
  try {
    const existing = await DoctorProfile.findOne({ userId: req.body.userId });
    if (existing) return res.status(400).json({ message: "Profile exists" });

    const profile = await DoctorProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET
export const getDoctorProfile = async (req: Request, res: Response) => {
  try {
    const profile = await DoctorProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateDoctorProfile = async (req: Request, res: Response) => {
  try {
    const profile = await DoctorProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    Object.assign(profile, req.body);
    await profile.save();
    res.status(200).json({ message: "Profile updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
