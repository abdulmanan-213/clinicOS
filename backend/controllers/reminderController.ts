import { Request, Response } from "express";
import Reminder from "../models/reminderSchema";

// CREATE reminder
export const createReminder = async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.create(req.body);
    res.status(201).json({ message: "Reminder created", reminder });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all reminders
export const getAllReminders = async (req: Request, res: Response) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single reminder
export const getReminderById = async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder)
      return res.status(404).json({ message: "Reminder not found" });
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE reminder
export const updateReminder = async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder)
      return res.status(404).json({ message: "Reminder not found" });

    Object.assign(reminder, req.body);
    await reminder.save();
    res.status(200).json({ message: "Reminder updated", reminder });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE reminder
export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder)
      return res.status(404).json({ message: "Reminder not found" });
    res.status(200).json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
