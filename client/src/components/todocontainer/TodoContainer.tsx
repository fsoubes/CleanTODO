import React from "react";

interface TodoContainerProps {
  children: React.ReactNode;
  title?: string;
  size: number;
}

export const TodoContainer: React.FC<TodoContainerProps> = ({
  title,
  size,
  children,
}) => {
  return (
    <div className="todo__list-container">
      <div className="todo__list-header">
        <h2>{title}</h2>
        <p>{size} tasks remaining</p>
      </div>
      <div className="todo__list-body">{children}</div>
    </div>
  );
};
