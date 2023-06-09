/**
 * @jest-environment jsdom
 */



import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import { deposit, withdrawal, transfer } from "./redux/accountSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("App", () => {
  let useDispatchMock;
  let useSelectorMock;

  beforeEach(() => {
    useDispatchMock = useDispatch;
    useSelectorMock = useSelector;
  });

  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test("renders App component", () => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue({ account: { balance: 0 } });

    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText("Bank Account")).toBeInTheDocument();
    expect(getByPlaceholderText("Recipient Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Amount")).toBeInTheDocument();
  });

  test("handles deposit", () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockReturnValue({ account: { balance: 0 } });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.change(getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.click(getByText("Deposit"));

    expect(dispatchMock).toHaveBeenCalledWith(deposit({ amount: 100 }));
    expect(getByPlaceholderText("Amount")).toHaveValue(0);
  });

  test("handles withdrawal", () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockReturnValue({ account: { balance: 100 } });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.change(getByPlaceholderText("Amount"), {
      target: { value: "50" },
    });
    fireEvent.click(getByText("Withdraw"));

    expect(dispatchMock).toHaveBeenCalledWith(withdrawal({ amount: 50 }));
    expect(getByPlaceholderText("Amount")).toHaveValue(0);
  });

  test("handles transfer", () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    useSelectorMock.mockReturnValue({ account: { balance: 100 } });

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.change(getByPlaceholderText("Recipient Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("Amount"), {
      target: { value: "50" },
    });
    fireEvent.click(getByText("Transfer"));

    expect(dispatchMock).toHaveBeenCalledWith(
      transfer({ name: "John Doe", amount: 50 })
    );
    expect(getByPlaceholderText("Recipient Name")).toHaveValue("");
    expect(getByPlaceholderText("Amount")).toHaveValue(0);
  });
});
