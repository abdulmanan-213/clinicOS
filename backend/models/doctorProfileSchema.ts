import mongoose, { Schema, Document } from "mongoose";

export interface IDoctorProfile extends Document {
  user: mongoose.Types.ObjectId;
  specialization: string;
  experience: number;
  availableSlots: string[];
}

const doctorProfileSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: Number,
    availableSlots: [String],
  },
  { timestamps: true },
);

export default mongoose.model<IDoctorProfile>(
  "DoctorProfile",
  doctorProfileSchema,
);
