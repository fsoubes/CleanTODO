import { Router } from "express";
import TodoSchema, { ITodo } from "../../Database/models/todo.model";

const addTask = async (item: string): Promise<ITodo | undefined> => {
  try {
    const task = new TodoSchema({
      task: item,
    });
    await task.save();

    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/add",
  async (req, res) => {
    try {
      const itemToAdd = req.body.task;
      const addedTask = await addTask(itemToAdd);
      res.status(200).send(addedTask);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
