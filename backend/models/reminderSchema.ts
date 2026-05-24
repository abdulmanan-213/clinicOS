import mongoose, { Schema, Document } from "mongoose";

export interface IReminder extends Document {
  patient: mongoose.Types.ObjectId;
  message: string;
  time: Date;
}

const reminderSchema: Schema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReminder>("Reminder", reminderSchema);
