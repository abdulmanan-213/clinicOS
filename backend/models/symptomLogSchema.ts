import mongoose, { Schema, Document } from "mongoose";

export interface ISymptomLog extends Document {
  patientId: mongoose.Types.ObjectId;
  symptoms: string[];
  result?: string;
  createdAt: Date;
  updatedAt: Date;
}

const symptomLogSchema: Schema<ISymptomLog> = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return value.length > 0;
        },
        message: "At least one symptom is required",
      },
    },
    result: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISymptomLog>("SymptomLog", symptomLogSchema);
