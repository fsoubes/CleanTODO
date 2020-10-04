import mongoose, { Schema, Document } from "mongoose";
import { ITodo } from "./todo.model";

export interface ITodoList extends Document {
  name: string;
  tasks: ITodo[];
}

const TodoListSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

export default mongoose.model<ITodoList>("TodoList", TodoListSchema);
