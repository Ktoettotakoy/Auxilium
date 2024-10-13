import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homeScreen.css'; // Import the CSS file

const HomeScreen = () => {
  const [userInput, setUserInput] = useState(""); // Store user input
  const navigate = useNavigate();

  // Function to handle submission
  const handleSubmit = async () => {
    const problemData = { Problem: userInput }; // Create JSON object
    
    try {
      const response = await fetch('http://localhost:50505/submit', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(problemData), // Convert the data to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Parse the response
      console.log(result); // Log result for debugging, remove this later
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleButtonClick = () => {
    navigate('/formSETNAMEScreen'); // Navigate to formSETNAMEScreen.js
  };

  return (
    <div className="container">
      <h1 className="header">Auxilium</h1>
        
      {/* Two-column layout */}
      <div className="two-column-layout">
        
        {/* Column 1 - User input and file upload */}
        <div className="column">
          <div className="prompt">
            <h2>Tell me a little bit about your problem</h2>
            <textarea
              className="textarea"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your issue here..."
            />
          </div>

          <div className="submit-docs">
            <label>Submit documents</label>
            <div className="upload-container">
              <button className="icon-button">
                <span role="img" aria-label="paperclip">📎</span>
              </button>
              <button className="upload-button">Upload File</button>
            </div>
          </div>
        </div>

        {/* Column 2 - Action buttons */}
        <div className="column">
          <div className="action-buttons">
            <button onClick={handleButtonClick}>I can help you fill out the Workplace Relation Commission Complaint Form</button>
            <button>Other Action 1</button>
            <button>Other Action 2</button>
            <button className="generate-button" onClick={handleSubmit}>Generate Actions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
