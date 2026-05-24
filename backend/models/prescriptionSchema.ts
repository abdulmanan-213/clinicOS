import mongoose, { Schema, Document } from "mongoose";

export interface IPrescription extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  medicines: string[];
  notes: string;
}

const prescriptionSchema: Schema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicines: [String],
    notes: String,
  },
  { timestamps: true },
);

export default mongoose.model<IPrescription>(
  "Prescription",
  prescriptionSchema,
);
