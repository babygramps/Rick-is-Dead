import React, { useState, useEffect } from 'react';
import secrets from 'secrets.js-grempe';
import './App.css';

function App() {
  const [numberOfFields, setNumberOfFields] = useState(3);
  const [sharedSecrets, setSharedSecrets] = useState(Array(3).fill(''));
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');
  const [showDecryptionSection, setShowDecryptionSection] = useState(false);

  useEffect(() => {
    const tileCount = 100;
    const skullTileContainer = document.getElementById('skull-tile-container');

    for (let i = 0; i < tileCount; i++) {
      const tile = document.createElement('div');
      tile.className = 'skull-tile';
      tile.innerHTML = '&#128128;';
      const topPosition = Math.random() * 100;
      const leftPosition = Math.random() * 100;
      tile.style.top = `${topPosition}vh`;
      tile.style.left = `${leftPosition}vw`;
      skullTileContainer.appendChild(tile);
    }
  }, []);

  const handleAddField = () => {
    setNumberOfFields(numberOfFields + 1);
    setSharedSecrets([...sharedSecrets, '']);
  };

  const handleInputChange = (e, index) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const newSharedSecrets = [...sharedSecrets];
    newSharedSecrets[index] = textarea.value;
    setSharedSecrets(newSharedSecrets);
  };

  const handleSubmit = () => {
    try {
      const secret = secrets.combine(sharedSecrets);
      const comb = secrets.hex2str(secret)
      setDecryptedMessage(comb);
      setShowDecryptionSection(true);
      setError('');  // Clear any previous error
    } catch (error) {
      console.error('Decryption failed:', error.message);
      setError('Decryption failed. Please ensure you have entered the correct secrets.');
    }
  };

  return (
    <div className="App">
      <div id="skull-tile-container"></div>
      <header className="App-header">
      <div className="background-box">  {/* New background box div */}
        <h1>Rick is Dead</h1>
        <p className="instruction-text">
          Well shit. I'm dead. I'm real sorry about that!
          <br />
          Copy and paste 3 unique secrets I've shared with you into this form and you'll get my password info for all my online services
        </p>
        {!showDecryptionSection && (
          <div className="input-container">
            {Array.from({ length: numberOfFields }, (_, index) => (
              <textarea
                key={index}
                placeholder="Add your shared secret here"
                className="input-field"
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="button" onClick={handleAddField}>
              Add More Fields
            </button>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {showDecryptionSection && (
          <div className="decrypted-section">
            <h2>Decrypted Message:</h2>
            <p>{decryptedMessage}</p>
          </div>
        )}
          </div>  {/* End of new background box div */}
      </header>
    </div>
  );
}

export default App;
