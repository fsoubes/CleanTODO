import { Router } from "express";
import TodoListSchema, { ITodoList } from "../../Database/models/todo.list";

const getTask = async (): Promise<ITodoList[] | null> => {
  try {
    const task = await TodoListSchema.find({}).populate({
      path: "tasks",
    });

    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).get(
  "/getLists",
  async (__, res) => {
    try {
      const addedTask = await getTask();
      res.status(200).send(addedTask);
    } catch (err) {
      throw err;
    }
  }
);
