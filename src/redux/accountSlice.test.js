import { configureStore } from "@reduxjs/toolkit";
import accountReducer, { deposit, withdrawal, transfer } from "./accountSlice";

describe("accountSlice", () => {
  let store;

  beforeEach(() => {
    // Set up a Redux store with the accountReducer
    store = configureStore({
      reducer: {
        account: accountReducer,
      },
    });
  });

  // Test for initial state
  test("should have initial state", () => {
    const initialState = {
      balance: 0,
      transactions: [],
    };

    // Verify that the initial state matches the expected initial state
    expect(store.getState().account).toEqual(initialState);
  });

  // Test for deposit action
  test("should handle deposit", () => {
    const depositAmount = 100;

    // Dispatch the deposit action with a deposit amount
    store.dispatch(deposit({ amount: depositAmount }));

    const newState = {
      balance: depositAmount,
      transactions: [
        {
          action: "Deposit",
          amount: depositAmount,
          balance: depositAmount,
        },
      ],
    };

    // Verify that the state after the deposit matches the expected state
    expect(store.getState().account).toEqual(newState);
  });

  // Test for withdrawal action
  test("should handle withdrawal", () => {
    const withdrawalAmount = 50;

    // Dispatch the withdrawal action with a withdrawal amount
    store.dispatch(withdrawal({ amount: withdrawalAmount }));

    const newState = {
      balance: -withdrawalAmount,
      transactions: [
        {
          action: "Withdrawal",
          amount: withdrawalAmount,
          balance: -withdrawalAmount,
        },
      ],
    };

    // Verify that the state after the withdrawal matches the expected state
    expect(store.getState().account).toEqual(newState);
  });

  // Test for transfer action
  test("should handle transfer", () => {
    const recipientName = "John";
    const transferAmount = 75;

    // Dispatch the transfer action with a recipient name and transfer amount
    store.dispatch(transfer({ name: recipientName, amount: transferAmount }));

    const newState = {
      balance: -transferAmount,
      transactions: [
        {
          action: `Transfer to ${recipientName}`,
          amount: transferAmount,
          balance: -transferAmount,
        },
      ],
    };

    // Verify that the state after the transfer matches the expected state
    expect(store.getState().account).toEqual(newState);
  });
});
