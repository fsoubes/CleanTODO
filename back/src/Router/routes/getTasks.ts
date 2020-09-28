import { Router } from "express";
import TodoSchema, { ITodo } from "../../Database/models/todo.model";

const getTasks = async (): Promise<ITodo[] | undefined> => {
  try {
    const task = await TodoSchema.find();
    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).get(
  "/getTodo",
  async (__, res) => {
    try {
      const addedTask = await getTasks();
      res.status(200).send(addedTask);
    } catch (err) {
      throw err;
    }
  }
);
