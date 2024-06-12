// src/App.js
import React, { useEffect, useState } from 'react';
import alchemy from './alchemy';
import './App.css';

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [blockDetails, setBlockDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBlockDetails() {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(latestBlockNumber);
        const block = await alchemy.core.getBlock(latestBlockNumber);
        setBlockDetails(block);
      } catch (err) {
        setError(err.message);
      }
    }

    getBlockDetails();

    const intervalId = setInterval(getBlockDetails, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const renderBlockDetails = (details) => {
    if (!details) {
      return null;
    }

    const {
      hash, parentHash, nonce, miner, difficulty, totalDifficulty, size, gasLimit, gasUsed, timestamp, transactions, extraData
    } = details;

    return (
      <div className="block-details">
        <h2>Block Number: {blockNumber}</h2>
        <div className="block-section">
          <h3>Basic Info</h3>
          <p><strong>Hash:</strong> {hash}</p>
          <p><strong>Parent Hash:</strong> {parentHash}</p>
          <p><strong>Nonce:</strong> {nonce}</p>
          <p><strong>Miner:</strong> {miner}</p>
          <p><strong>Difficulty:</strong> {difficulty ? difficulty.toString() : 'N/A'}</p>
          <p><strong>Total Difficulty:</strong> {totalDifficulty ? totalDifficulty.toString() : 'N/A'}</p>
          <p><strong>Size:</strong> {size} bytes</p>
          <p><strong>Gas Limit:</strong> {gasLimit ? gasLimit.toString() : 'N/A'}</p>
          <p><strong>Gas Used:</strong> {gasUsed ? gasUsed.toString() : 'N/A'}</p>
          <p><strong>Timestamp:</strong> {timestamp ? new Date(timestamp * 1000).toLocaleString() : 'N/A'}</p>
        </div>
        <div className="block-section">
          <h3>Transactions</h3>
          <ul>
            {transactions && transactions.slice(0, 10).map((tx) => (
              <li key={tx}>{tx}</li>
            ))}
          </ul>
          {transactions && transactions.length > 10 && <p>And more...</p>}
        </div>
        <div className="block-section">
          <h3>Extra Data</h3>
          <p>{extraData}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethereum Block Explorer</h1>
        {error ? <p>Error: {error}</p> : null}
        {blockNumber !== null && renderBlockDetails(blockDetails)}
      </header>
    </div>
  );
}

export default App;
