import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
    expect(screen.getByText(/Search:/i)).toBeInTheDocument(); //get label by text
    expect(screen.getByRole('textbox')).toBeInTheDocument();  //get input by role
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument(); //get input by labael text
    expect(screen.getByPlaceholderText('enter search query')).toBeInTheDocument(); //get input by placeholder text
    expect(screen.getByAltText('search icon')).toBeInTheDocument(); //get img by alt text
    // expect(screen.getAllByDisplayValue('')).toBeInTheDocument(); //get imput (or another form field) by value attribute static string - initial value
  });
});