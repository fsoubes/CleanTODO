import React, { useRef } from "react";

// Types
import { TodoType, UpdateDataAction } from "../../../types/types";

// API
import { postApi } from "../../../helpers/postApi";

interface AchievedTasks {
  isAchieved?: React.Dispatch<UpdateDataAction>;
}

type TodoItemProps = TodoType & AchievedTasks;

export const TodoItem: React.FC<TodoItemProps> = ({
  _id,
  task,
  completed,
  createdAt,
  time,
  updatedAt,
  index,
  isAchieved,
}) => {
  const handleClick = async (): Promise<void> => {
    try {
      if (isCheck.current) {
        isAchieved({
          type: "editTodo",
          update: { index: _id, edit: !isCheck.current.checked },
        });
        await postApi({ completed: !isCheck.current.checked }, `update/${_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isCheck = useRef<HTMLInputElement>(null);

  return (
    <div className="task">
      <input
        ref={isCheck}
        type="checkbox"
        id={`task-${index}`}
        defaultChecked={completed}
      ></input>
      <label onClick={handleClick} htmlFor={`task-${index}`}>
        <span className="custom-checkbox"></span>
        {task}
      </label>
    </div>
  );
};
