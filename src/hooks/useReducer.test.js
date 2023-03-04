import React, { useReducer } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const initialState = { count: 0 };

const reducer = ({ count }, { type }) => {
  switch (type) {
    case "INCREMENT":
      return { count: count + 1 };
    case "DECREMENT":
      return { count: count - 1 };
    default:
      return {};
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </>
  );
};

describe("useReducer", () => {
    it("hook testing", async () => {
        render(<Counter />);
        expect(screen.getByRole("heading")).toHaveTextContent('0');
        await userEvent.click(screen.getByText("+1"));
        expect(screen.getByRole("heading")).toHaveTextContent('1');
        await userEvent.click(screen.getByText("-1"));
        expect(screen.getByRole("heading")).toHaveTextContent('0');
    });
});