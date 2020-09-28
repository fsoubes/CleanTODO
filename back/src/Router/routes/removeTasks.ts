import { Router } from "express";
import TodoSchema from "../../Database/models/todo.model";

const removeTask = async (taskIds: string[]): Promise<string> => {
  try {
    await TodoSchema.deleteMany({
      _id: {
        $in: taskIds,
      },
    });
    return `${JSON.stringify(taskIds)} Removed!`;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/deleteTasks",
  async (req, res) => {
    try {
      const itemToRemove = req.body.taskIds;
      const addedTask = await removeTask(itemToRemove);
      res.status(200).send(addedTask);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
