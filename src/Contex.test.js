import React, { useState, useContext, createContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin}}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

export const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <>
      <button type="button" onClick={()=>toggleLogin()}></button>
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
    it("ConsumerComponent shows default value", () => {
        render(
            <AuthProvider>
            <ConsumerComponent />
            </AuthProvider>
        );
        expect(screen.getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    });
  
    it("ConsumerComponent toggle value", () => {
        render(
            <AuthProvider>
            <ConsumerComponent />
            </AuthProvider>
        );
        expect(screen.getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
        // await userEvent.click(screen.getByRole("button")); //working only with async await 🤷🏻‍♂️
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(/^Message:/)).toHaveTextContent("Message: Welcome!");
        // await userEvent.click(screen.getByRole("button")); //working only with async await 🤷🏻‍♂️
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    });
});