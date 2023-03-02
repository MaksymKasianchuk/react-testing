import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('renders App component', () => {
    render(<App />);
    expect(screen.queryByText(/searches for react/i)).toBeNull(); // markup has no such element
  });
  it('async user fetch', async () => {
    render(<App />);
    expect(screen.queryByText(/Logged in as/i)).toBeNull();                // check if markup has no element with this text
    // screen.debug();                                                    // can see that markup has no h2 tag
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument(); // then after await async operation we check that markup has element with this text
    // screen.debug();                                                    // can see that markup has h2 tag with user name after user fetching
  });
  it('find img with class', () => {
    render(<App />);
    expect(screen.getByAltText(/search icon/i)).toHaveClass('search-img'); // get img with this alt text and check class 'search-img'
  });
  it('input tests', () => {
    render(<App />);
    // expect(screen.getByLabelText(/search:/i)).not.toBeRequired();        // input has no required attr
    expect(screen.getByLabelText(/search:/i)).toBeRequired();               // get input with this label text and check is it required
    expect(screen.getByLabelText(/search:/i)).toBeEmptyDOMElement();        // check if input is empty (toBeEmpty - deprecated)
    expect(screen.getByLabelText(/search:/i)).toHaveAttribute('id');        // check if input has attr id 
    expect(screen.getByLabelText(/search:/i)).not.toHaveStyle('color: red');// check input has no style 'color: red'
  });
});