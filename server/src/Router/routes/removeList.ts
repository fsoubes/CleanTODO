import { Router } from "express";
import TodoSchema from "../../Database/models/todo.model";
import TodoListSchema, { ITodoList } from "../../Database/models/todo.list";

const removeList = async (id: string): Promise<string> => {
  try {
    await TodoListSchema.findOneAndRemove(
      { _id: id },
      async (err: Error, response: ITodoList | null) => {
        try {
          if (response) {
            await TodoSchema.deleteMany(
              { _id: { $in: response.tasks } },
              (err) => {
                throw err;
              }
            );
          }
        } catch (err) {
          throw err;
        }
      }
    );
    return `${id} Removed!`;
  } catch (err) {
    throw err;
  }
};

module.exports = Router({ mergeParams: true }).post(
  "/deleteList/:id",
  async (req, res) => {
    try {
      const itemToRemove = req.params.id;
      const removedList = await removeList(itemToRemove);
      res.status(200).send(removedList);
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
);
