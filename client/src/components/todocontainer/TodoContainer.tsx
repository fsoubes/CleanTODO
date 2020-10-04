import React from "react";

export interface TodoContainerProps {
  children: React.ReactNode;
  todoName?: string[];
  size: number;
  setId?: React.Dispatch<React.SetStateAction<number>>;
  deleteList?: () => Promise<void>;
  currentId?: number;
}

export const TodoContainer: React.FC<TodoContainerProps> = ({
  size,
  children,
  todoName,
  setId,
  currentId,
  deleteList,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setId(parseInt(event.target.value));
  };

  const handleRemove = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    deleteList();
  };

  return (
    <div className="todo__list-container">
      <div className="todo__list-header">
        <div onClick={handleRemove} className="todo__list-remove">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12"></circle>
            <polygon
              className="close-btn"
              points="17.8,16.7 16.6,17.9 12,13.3 7.4,17.9 6.2,16.7 10.8,12.1 6.2,7.5 7.4,6.3 12,11 16.6,6.4 17.8,7.6 13.2,12.2 "
            ></polygon>
          </svg>
        </div>

        <div className="todo__list-info">
          <div className="custom-select">
            <select onChange={handleSelect} value={currentId}>
              {todoName.map((value, index): any => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </select>
            <span className="custom-arrow"></span>
          </div>
          <p>{size} tasks remaining</p>
        </div>
      </div>
      <div className="todo__list-body">{children}</div>
    </div>
  );
};
