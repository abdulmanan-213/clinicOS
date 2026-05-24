import { Request, Response } from "express";
import SymptomLog from "../models/symptomLogSchema";

// CREATE symptom log
export const createSymptomLog = async (req: Request, res: Response) => {
  try {
    const log = await SymptomLog.create(req.body);
    res.status(201).json({ message: "Symptom logged", log });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all logs
export const getAllSymptomLogs = async (req: Request, res: Response) => {
  try {
    const logs = await SymptomLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single log
export const getSymptomLogById = async (req: Request, res: Response) => {
  try {
    const log = await SymptomLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE log
export const updateSymptomLog = async (req: Request, res: Response) => {
  try {
    const log = await SymptomLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });

    Object.assign(log, req.body);
    await log.save();
    res.status(200).json({ message: "Log updated", log });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE log
export const deleteSymptomLog = async (req: Request, res: Response) => {
  try {
    const log = await SymptomLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.status(200).json({ message: "Log deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
