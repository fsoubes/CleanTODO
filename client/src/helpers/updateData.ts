import { TodoType, UpdateDataAction } from "../types/types";

export const todoReducer = (
  initialValues: TodoType[],
  action: UpdateDataAction
) => {
  switch (action.type) {
    case "addTodo":
      return [...initialValues, action.todo];

    case "removeTodos":
      return initialValues.filter((item) => item.completed === false);

    case "editTodo":
      return initialValues.map((item, index) =>
        item._id === action.update.index
          ? {
              ...item,
              completed: action.update.edit,
            }
          : item
      );
    case "addFromDb":
      return [...initialValues, ...action.data];
    default:
      return initialValues;
  }
};
