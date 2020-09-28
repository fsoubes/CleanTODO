import React from "react";

// Types
import { UpdateDataAction, TodoType } from "../../types/types";

// Component
import { TodoItem } from "./TodoItem/TodoItem";

interface TodoListProps {
  data: TodoType[];
  editTask: React.Dispatch<UpdateDataAction>;
  todos: TodoType[];
}

export const TodoList: React.FC<TodoListProps> = ({ editTask, todos }) => {
  const todoList = todos.map((item, index) => {
    return (
      <TodoItem
        _id={item._id}
        index={index + 1}
        completed={item.completed}
        task={item.task}
        key={item._id}
        isAchieved={editTask}
      />
    );
  });

  return <div className="tasks">{todoList}</div>;
};
