import { Response } from "express";
import Report from "../models/reportsSchema";
import { AuthRequest } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";

// Upload multiple reports to Cloudinary
export const uploadReports = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.files || !(req.files instanceof Array)) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files as Express.Multer.File[];
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "clinicOS_reports", // folder in Cloudinary
      });
      uploadedUrls.push(result.secure_url);
    }

    const report = await Report.create({
      patient: req.user?._id,
      fileUrl: uploadedUrls,
      description: req.body.description || "",
    });

    res.status(201).json({
      message: "Reports uploaded successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reports
export const getAllReports = async (req: AuthRequest, res: Response) => {
  try {
    const reports = await Report.find({ patient: req.user?._id }).populate(
      "patient",
      "name email",
    );
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single report
export const getReportById = async (req: AuthRequest, res: Response) => {
  try {
    const report = await Report.findById(req.params.id).populate(
      "patient",
      "name email",
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete report and files from Cloudinary
export const deleteReport = async (req: AuthRequest, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Delete each file from Cloudinary
    for (const url of report.fileUrl) {
      const publicId = url.split("/").pop()?.split(".")[0]; // remove extension
      if (publicId)
        await cloudinary.uploader.destroy(`clinic_reports/${publicId}`);
    }

    await report.deleteOne();
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
