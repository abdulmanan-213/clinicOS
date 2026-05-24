import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import patientRoutes from "./routes/patientRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import prescriptionRoutes from "./routes/prescriptionRoutes";
import reportRoutes from "./routes/reportsRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import symptomRoutes from "./routes/symptomsRoutes";

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/symptoms", symptomRoutes);

// Middleware
import { errorHandler } from "./middleware/errorMiddleware";

const PORT = Number(process.env.PORT) || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
