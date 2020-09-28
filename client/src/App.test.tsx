import React from "react";
import { render } from "@testing-library/react";
import App from "./components/app/App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/What I need to do/i);
  expect(linkElement).toBeInTheDocument();
});
