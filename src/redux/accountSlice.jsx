import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0, // Initial balance is set to 0
  transactions: [], // Initial transactions array is empty
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      const { amount } = action.payload; // Get the deposit amount from the action payload
      state.balance += amount; // Increase the balance by the deposit amount
      state.transactions.push({
        // Add a new transaction object to the transactions array
        action: "Deposit", // Action type is "Deposit"
        amount, // Deposit amount
        balance: state.balance, // Updated balance after the deposit
      });
    },
    withdrawal: (state, action) => {
      const { amount } = action.payload; // Get the withdrawal amount from the action payload
      state.balance -= amount; // Decrease the balance by the withdrawal amount
      state.transactions.push({
        // Add a new transaction object to the transactions array
        action: "Withdrawal", // Action type is "Withdrawal"
        amount, // Withdrawal amount
        balance: state.balance, // Updated balance after the withdrawal
      });
    },
    transfer: (state, action) => {
      const { name, amount } = action.payload; // Get the recipient name and transfer amount from the action payload
      state.balance -= amount; // Decrease the balance by the transfer amount
      state.transactions.push({
        // Add a new transaction object to the transactions array
        action: `Transfer to ${name}`, // Action type is "Transfer to [Recipient Name]"
        amount, // Transfer amount
        balance: state.balance, // Updated balance after the transfer
      });
    },
  },
});

export const { deposit, withdrawal, transfer } = accountSlice.actions;
export default accountSlice.reducer;
