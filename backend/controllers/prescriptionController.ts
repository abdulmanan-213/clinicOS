import { Request, Response } from "express";
import Prescription from "../models/prescriptionSchema";

// CREATE prescription
export const createPrescription = async (req: Request, res: Response) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json({ message: "Prescription created", prescription });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all prescriptions
export const getAllPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single prescription
export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription)
      return res.status(404).json({ message: "Prescription not found" });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE prescription
export const updatePrescription = async (req: Request, res: Response) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription)
      return res.status(404).json({ message: "Prescription not found" });

    Object.assign(prescription, req.body);
    await prescription.save();
    res.status(200).json({ message: "Prescription updated", prescription });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE prescription
export const deletePrescription = async (req: Request, res: Response) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription)
      return res.status(404).json({ message: "Prescription not found" });
    res.status(200).json({ message: "Prescription deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
