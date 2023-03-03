import { render, act, screen } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock("axios");

const hits = [
  {
    objectId: "1", 
    title: "Angular",
  },
  {
    objectId: "2", 
    title: "React",
  },
] ;

describe("App", () => {
  test("fetch news from API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: hits, }));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
    //Additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://hn.algolia.com/api/v1/search?query=React");
  });

  test("fetch news from API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/i);
    expect(message).toBeInTheDocument();
  });

  test("fetch news from API with act", async () => {
    const promise = Promise.resolve({ data: hits, });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    // const items = await screen.findAllByRole("listitem");
    await act(() => promise);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
