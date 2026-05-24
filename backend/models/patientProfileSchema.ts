import mongoose, { Schema, Document } from "mongoose";

export interface IPatientProfile extends Document {
  user: mongoose.Types.ObjectId;
  age: Number;
  gender: string;
  medicalHistory: string[];
}

const patientProfileSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: Number,
    gender: String,
    medicalHistory: [String],
  },
  { timestamps: true },
);

export default mongoose.model<IPatientProfile>(
  "PatientProfile",
  patientProfileSchema,
);
