import { Router } from "express";
import TodoSchema from "../../Database/models/todo.model";

const removeTask = async (id: string): Promise<string> => {
  try {
    await TodoSchema.deleteOne({ _id: id });
    return `${id} Removed!`;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/delete",
  async (req, res) => {
    try {
      const itemToRemove = req.body.id;
      const addedTask = await removeTask(itemToRemove);
      res.status(200).send(addedTask);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
