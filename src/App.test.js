/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { deposit, withdrawal, transfer } from "./redux/accountSlice";

jest.mock("./redux/accountSlice", () => ({
  deposit: jest.fn(),
  withdrawal: jest.fn(),
  transfer: jest.fn(),
}));

describe("App", () => {
  test("renders balance correctly", () => {
    const { getByText } = render(<App />);
    const balanceElement = getByText("Current Balance: 0");
    expect(balanceElement).toBeInTheDocument();
  });

  test("handles deposit", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const depositInput = getByPlaceholderText("Deposit Amount");
    const depositButton = getByText("Deposit");

    fireEvent.change(depositInput, { target: { value: "100" } });
    fireEvent.click(depositButton);

    expect(deposit).toHaveBeenCalledWith({ amount: 100 });
    expect(depositInput.value).toBe("0");
  });

  test("handles withdrawal", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const withdrawalInput = getByPlaceholderText("Withdrawal Amount");
    const withdrawalButton = getByText("Withdraw");

    fireEvent.change(withdrawalInput, { target: { value: "50" } });
    fireEvent.click(withdrawalButton);

    expect(withdrawal).toHaveBeenCalledWith({ amount: 50 });
    expect(withdrawalInput.value).toBe("0");
  });

  test("handles transfer", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const transferNameInput = getByPlaceholderText("Recipient Name");
    const transferAmountInput = getByPlaceholderText("Amount");
    const transferButton = getByText("Transfer");

    fireEvent.change(transferNameInput, { target: { value: "John" } });
    fireEvent.change(transferAmountInput, { target: { value: "200" } });
    fireEvent.click(transferButton);

    expect(transfer).toHaveBeenCalledWith({ name: "John", amount: 200 });
    expect(transferNameInput.value).toBe("");
    expect(transferAmountInput.value).toBe("0");
  });
});
