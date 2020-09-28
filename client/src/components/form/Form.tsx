import React, { useState, useRef } from "react";

import { addApi } from "../../helpers/postApi";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

import { UpdateDataAction } from "../../types/types";

interface FormProps {
  dispatch: React.Dispatch<UpdateDataAction>;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ dispatch, children }) => {
  const [task, setTask] = useState<{ task: string }>({ task: "" });

  const textRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (task.task) {
        await addApi(task, "add").then((data) => {
          dispatch({ type: "addTodo", todo: data });
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
        <TextField textRef={textRef} setTask={setTask} />
      </div>
      {children}
    </form>
  );
};
