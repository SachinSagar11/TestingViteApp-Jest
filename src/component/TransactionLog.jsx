import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './transactionLog.css'; // Import your custom CSS file

const TransactionLog = () => {
  const transactions = useSelector(state => state.account.transactions); // Get the transactions from the Redux store
  const [isOpen, setIsOpen] = useState(false); // State variable to track whether the log is open or closed

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state value when the button is clicked
  };

  return (
    <div className="transaction-log-container">
      <h2>Transaction Log</h2>
      <div>
        <button
          className="transaction-log-button"
          onClick={handleToggleDropdown}
        >
          {isOpen ? 'Hide Logs' : 'Show Logs'}
        </button>
        {isOpen && (
          <ul className="transaction-log-list">
            {transactions.map((transaction, index) => (
              <li className="transaction-log-item" key={index}>
                Action: {transaction.action}, Amount: {transaction.amount}, Total Balance: {transaction.balance}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionLog;
