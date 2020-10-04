import React, { useState, useRef } from "react";

import { addApi } from "../../helpers/postApi";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

import { UpdateDataActionList } from "../../types/types";

interface FormProps {
  dispatch: React.Dispatch<UpdateDataActionList>;
  route: string;
  action: string;
  children?: React.ReactNode;
  isAddingList?: boolean;
  updateListName?: React.Dispatch<React.SetStateAction<string[] | []>>;
  currentIdx?: number;
}

export const Form: React.FC<FormProps> = ({
  dispatch,
  children,
  route,
  action,
  isAddingList = false,
  updateListName,
  currentIdx,
}) => {
  const [task, setTask] = useState<{ task: string }>({ task: "" });

  const textRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (task.task) {
        const params = {
          ...(isAddingList && {
            name: task.task,
          }),
          ...(!isAddingList && {
            task: task.task,
          }),
        };
        await addApi(params, route).then((data) => {
          if (isAddingList) {
            updateListName((prev) => [...prev, task.task]);
            dispatch({ type: action, todoList: data });
          } else {
            dispatch({ type: action, update: { todo: data, id: currentIdx } });
          }

          setTask({ task: "" });
          if (textRef.current) {
            textRef.current.value = "";
          }
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button />

        <TextField
          textRef={textRef}
          setTask={setTask}
          placeHold={isAddingList ? "Add List" : "Add Todo"}
        />
      </div>
      {children}
    </form>
  );
};
