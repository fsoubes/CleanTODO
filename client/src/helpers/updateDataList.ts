import { UpdateDataActionList, TodoList, TodoType } from "../types/types";

export const todoListReducer = (
  initialValues: TodoList[],
  action: UpdateDataActionList
) => {
  switch (action.type) {
    case "addList":
      return [...initialValues, action.todoList];
    case "addTodoToList": {
      const updateList = {
        ...initialValues[action.update.id],
        tasks: [...initialValues[action.update.id].tasks, action.update.todo],
      };
      initialValues[action.update.id] = updateList;
      return [...initialValues];
    }
    case "removeTodos":
      const updateList = {
        ...initialValues[action.update.id],
        tasks: initialValues[action.update.id]["tasks"].filter(
          (item: TodoType) => item.completed === false
        ),
      };
      initialValues[action.update.id] = updateList;
      return [...initialValues];
    case "removeList":
      return initialValues.filter((item) => item.name !== action.name);
    case "editTodo":
      const updatedTasks = {
        ...initialValues[action.update.id],
        tasks: initialValues[action.update.id]["tasks"].map((item: TodoType) =>
          item._id === action.update.index
            ? {
                ...item,
                completed: action.update.edit,
              }
            : item
        ),
      };
      initialValues[action.update.id] = updatedTasks;
      return [...initialValues];
    case "addFromDb":
      return [...initialValues, ...action.data];
    default:
      return initialValues;
  }
};
