import { Router } from "express";
import TodoListSchema, { ITodoList } from "../../Database/models/todo.list";

const addList = async (item: string): Promise<ITodoList | undefined> => {
  try {
    const listTodo = new TodoListSchema({
      name: item,
    });
    await listTodo.save();

    return listTodo;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/addList",
  async (req, res) => {
    try {
      const itemToAdd = req.body.name;
      const addedTask = await addList(itemToAdd);
      res.status(200).send(addedTask);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
