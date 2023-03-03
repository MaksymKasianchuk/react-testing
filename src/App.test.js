import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    expect(screen.queryByText(/Logged in as/i)).toBeNull();               // markup has no h2 tag
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument(); // await promise and get h2 tag in markup
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });                                                                   //test input change with "React" value
    userEvent.type(screen.getByRole("textbox"), "React");               
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
    // fireEvent.click(checkbox);                      // do click on checkbox
    userEvent.click(checkbox);   
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true }); //click with pressed Ctrl, Shift 
    expect(handleChange).toHaveBeenCalledTimes(1);  // after clicking handleChange fuc was called 1 time
    expect(checkbox).toBeChecked();                 // checkbox is checked
  });
  it("double click", () => {
    const onChnge = jest.fn();                  //create abstract checkbox handler function
    render(<input type="checkbox" onChange={onChnge} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();         // checkbox is not checked
    userEvent.dblClick(checkbox);               // do double click
    expect(onChnge).toHaveBeenCalledTimes(2);   //check that onChnge fn have been called 2 times
  });
  it("focus", () => {
    render(
      <div>
        <input type="checkbox" data-testid="element"/>
        <input type="radio" data-testid="element"/>
        <input type="number" data-testid="element"/>
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });
  it("select options", () => {
    render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(screen.getByRole('combobox'), "1");
    expect(screen.getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole('combobox'), "2");
    expect(screen.getByText("B").selected).toBeTruthy();
    expect(screen.queryByText("A").selected).toBeFalsy();
  });
});