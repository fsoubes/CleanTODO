import React from "react";

interface TextFieldProps {
  setTask?: React.Dispatch<React.SetStateAction<{ task: string }>>;
  textRef?: React.RefObject<HTMLInputElement>;
  placeHold?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  setTask,
  textRef,
  placeHold,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({ task: event.target.value });
  };

  return (
    <input
      ref={textRef}
      onChange={handleChange}
      placeholder={placeHold}
      className="confirm__input"
    ></input>
  );
};
