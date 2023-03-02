import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    expect(screen.queryByText(/Logged in as/i)).toBeNull();               // markup has no h2 tag
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument(); // await promise and get h2 tag in markup
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });                                                                   //test input change with "React" value
    expect(screen.getByText(/Searches for React/i)).toBeInTheDocument();//get p tag with text after input change
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();                 //create abstract checkbox handler function
    render(<input type="checkbox" onChange={handleChange} />);
    // const checkbox = container.firstChild;       //Disallow direct Node access
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();             // checkbox is not checked
    fireEvent.click(checkbox);                      // do click on checkbox
    expect(handleChange).toHaveBeenCalledTimes(1);  // after clicking handleChange fuc was called 1 time
    expect(checkbox).toBeChecked();                 // checkbox is checked
  });
  it("input focus", () => {
    render(<input type="text" data-testid="simple-input"/>);
    const input = screen.getByTestId('simple-input');   // get element with test id
    expect(input).not.toHaveFocus();                    // input has no focuse
    input.focus();                                      // do focuse on input (wihtout fireEvent)
    expect(input).toHaveFocus();                        // input has a focuse
  });
});