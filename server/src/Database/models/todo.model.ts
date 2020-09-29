import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  task: string;
  completed: boolean;
  time: Date;
}

const TodoSchema: Schema = new Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, default: false, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
