import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, transfer } from "./redux/accountSlice";
import TransactionLog from "./component/TransactionLog";
import "./App.css"; // Import your custom CSS file

const App = () => {
  // State variables for input fields
  const [depositAmount, setDepositAmount] = useState(0); // Track deposit amount entered by the user
  const [withdrawalAmount, setWithdrawalAmount] = useState(0); // Track withdrawal amount entered by the user
  const [transferName, setTransferName] = useState(""); // Track recipient name entered by the user for transfer
  const [transferAmount, setTransferAmount] = useState(0); // Track transfer amount entered by the user

  // Accessing balance from the Redux store
  const balance = useSelector((state) => state.account.balance); // Get current balance from the Redux store
  const dispatch = useDispatch();

  // Event handler for deposit action
  const handleDeposit = () => {
    dispatch(deposit({ amount: Number(depositAmount) })); // Dispatch deposit action with the entered deposit amount
    setDepositAmount(0); // Reset deposit amount after deposit action is dispatched
  };

  // Event handler for withdrawal action
  const handleWithdrawal = () => {
    dispatch(withdrawal({ amount: Number(withdrawalAmount) })); // Dispatch withdrawal action with the entered withdrawal amount
    setWithdrawalAmount(0); // Reset withdrawal amount after withdrawal action is dispatched
  };

  // Event handler for transfer action
  const handleTransfer = () => {
    dispatch(transfer({ name: transferName, amount: Number(transferAmount) })); // Dispatch transfer action with the entered recipient name and transfer amount
    setTransferName(""); // Reset recipient name after transfer action is dispatched
    setTransferAmount(0); // Reset transfer amount after transfer action is dispatched
  };

  return (
    <div className="app-container">
      <h1>Bank Account</h1>
      <div className="balance-container">
        <h2>Current Balance: {balance}</h2>
        <div className="transaction-container">
          <h3>Deposit</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>
        <div className="transaction-container">
          <h3>Withdrawal</h3>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          <button onClick={handleWithdrawal}>Withdraw</button>
        </div>
        <div className="transaction-container">
          <h3>Transfer</h3>
          <input
            type="text"
            placeholder="Recipient Name"
            value={transferName}
            onChange={(e) => setTransferName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <button onClick={handleTransfer}>Transfer</button>
        </div>
      </div>
      <TransactionLog />
    </div>
  );
};

export default App;
