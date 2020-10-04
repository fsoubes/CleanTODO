import { Router } from "express";
import TodoSchema, { ITodo } from "../../Database/models/todo.model";
import TodoListSchema from "../../Database/models/todo.list";

interface TodoArgs {
  task: string;
  completed: boolean;
}

const addTasksToList = async (
  id: string,
  args: TodoArgs
): Promise<ITodo | undefined> => {
  try {
    const toDo = {
      ...(args.task && {
        task: args.task,
      }),
      ...(args.completed !== null && {
        completed: args.completed,
      }),
    };

    const task = new TodoSchema({
      ...toDo,
    });

    await TodoListSchema.updateOne(
      { _id: id },
      { $addToSet: { tasks: task._id } },
      { upsert: true, new: true }
    );

    await task.save();

    return task;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/addToList/:id",
  async (req, res) => {
    try {
      const itemToUpdate = req.params.id;
      const addedTask = await addTasksToList(itemToUpdate, { ...req.body });
      res.status(200).send(addedTask);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
