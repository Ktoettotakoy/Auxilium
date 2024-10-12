// frontend/src/pages/auxiliumForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homeScreen.css'; // Import the CSS file

const HomeScreen = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/formSETNAMEScreen'); // Navigate to formSETNAMEScreen.js
  };

  return (
    <div className="container">
      {/* Row 1 */}
      <h1 className="header">Auxilium</h1>

      {/* Row 2 */}
      <div className="prompt">
        <h2>Tell me a little bit about your problem</h2>
        <textarea
          className="textarea"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your issue here..."
        />
      </div>

      {/* Row 3 */}
      <div className="submit-docs">
        <label>Submit documents</label>
        <div className="upload-container">
          <button className="icon-button">
            <span role="img" aria-label="paperclip">📎</span>
          </button>
          <button className="upload-button">Upload File</button>
        </div>
      </div>

      {/* Row 4 */}
      <div className="action-buttons">
        <button onClick={handleButtonClick}>I can help you fill out the Workplace Relation Commission Complaint Form</button> {/* Updated button */}
        <button>...</button>
        <button>...</button>
        <button className="generate-button">Generate Actions</button>
      </div>
    </div>
  );
};

export default HomeScreen;