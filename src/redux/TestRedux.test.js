import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { reducer } from "./reducer";
import TestRedux from "./TestRedux";

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Redux testing", ()=>{
    it("check init state is equal to 0", ()=>{
        renderWithRedux(<TestRedux />);
        expect(screen.getByRole("heading")).toHaveTextContent("0");
    });
    it("increment test", async ()=>{
        renderWithRedux(<TestRedux />, {
            initialState: {count: 5},
        });
        await userEvent.click(screen.getByText("+1"));
        expect(screen.getByRole("heading")).toHaveTextContent("6");
    });
    it("decrement test", async ()=>{
        renderWithRedux(<TestRedux />, {
            initialState: {count: 5},
        });
        await userEvent.click(screen.getByText("-1"));
        expect(screen.getByRole("heading")).toHaveTextContent("4");
    });
});