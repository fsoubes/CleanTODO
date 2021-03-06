import React from "react";

interface ButtonProps {}

export const Button: React.FC<ButtonProps> = () => {
  return (
    <button className="confirm__button">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </button>
  );
};
