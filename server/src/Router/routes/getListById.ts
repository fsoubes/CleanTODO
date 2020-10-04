import { Router } from "express";
import TodoListSchema, { ITodoList } from "../../Database/models/todo.list";

const getListById = async (id: string): Promise<ITodoList | null> => {
  try {
    const task = await TodoListSchema.findOne({ _id: id }).populate({
      path: "tasks",
    });

    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).get(
  "/getList/:id",
  async (req, res) => {
    try {
      const todoToShow = req.params.id;
      const addedTask = await getListById(todoToShow);
      res.status(200).send(addedTask);
    } catch (err) {
      throw err;
    }
  }
);
