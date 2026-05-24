import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  patient: mongoose.Types.ObjectId;
  fileUrl: string[];
  description?: string; // optional description
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema: Schema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReport>("Report", reportSchema);
