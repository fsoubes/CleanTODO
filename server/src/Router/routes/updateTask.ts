import { Router } from "express";
import TodoSchema from "../../Database/models/todo.model";
interface TodoArgs {
  task: string;
  completed: boolean;
}
const updateTask = async (
  id: string,
  args: TodoArgs
): Promise<string | null> => {
  try {
    const toDo = {
      ...(args.task && {
        task: args.task,
      }),
      ...(args.completed !== null && {
        completed: args.completed,
      }),
    };

    const updateDocument = await TodoSchema.updateOne(
      { _id: id },
      { $set: { ...toDo } },
      (err) => {
        if (err) {
          return err;
        }
      }
    );

    if (updateDocument.n === 0) return null;

    return `${id} Updated!`;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/update/:id",
  async (req, res) => {
    try {
      const itemToUpdate = req.params.id;
      const addedTask = await updateTask(itemToUpdate, { ...req.body });
      addedTask
        ? res.status(200).send(addedTask)
        : res.status(404).send("Item not in DB!");
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
