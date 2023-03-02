import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { asFragment } = render(<App />);
  // const linkElement = screen.getByText(/learn react/i); get elem by text
  // screen.debug(); // debug and get markup in console
  expect(asFragment(<App />)).toMatchSnapshot(); //get snapshot
});
