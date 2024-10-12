

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formSETNAMEScreen.css';

const FormSETNAMEScreen = () => {
  const [complaintType, setComplaintType] = useState('');
  const [specificComplaints, setSpecificComplaints] = useState([]);
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  const complaintTypes = {
    Pay: ['I do not receive the minimum wage', 'I do not receive overtime pay', 'I did not receive the appropriate payment in lieu of termination of my employment'],
    Hours: ['I am not given my scheduled hours', 'I am forced to work unpaid overtime'],
    Dismissal: ['I was fired without notice', 'I was unfairly dismissed'],
    Discrimination: ['I was treated unfairly due to my race', 'I was denied a promotion due to my gender'],
    Penalisation: ['I was punished for reporting an issue', 'I faced retaliation for whistleblowing'],
  };

  const handleComplaintTypeChange = (e) => {
    const selectedType = e.target.value;
    setComplaintType(selectedType);
    setSpecificComplaints(complaintTypes[selectedType] || []);
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate back to homeScreen.js
  };

  return (
    <div className="container">
      {/* Back Button */}
      <button onClick={handleBackButtonClick} className="back-button">Back to Auxilium Home</button>

      {/* Row 1 */}
      <div className="header">
        <h1 className="title">Workplace Relations Commission</h1>
        <h2 className="auxilium">Autofill Powered By AUXILIUM</h2>
      </div>

      {/* Row 2 */}
      <h3 className="complaint-type-header">Complaint Type</h3>

      {/* Row 3 */}
      {/* Row 3 */}
        <div className="complaint-section">
          <div className="dropdown-container">
            <label htmlFor="complaintType">Select...</label>
            <select id="complaintType" value={complaintType} onChange={handleComplaintTypeChange}>
              <option value="">--Select Complaint Type--</option>
              {Object.keys(complaintTypes).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="specific-complaints">
            {specificComplaints.map((complaint, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`complaint-${index}`}
                  name="specificComplaint"
                  value={complaint}
                />
                <label htmlFor={`complaint-${index}`}>{complaint}</label>
              </div>
            ))}
          </div>
        </div>

      {/* Row 5 */}
      <h3 className="details-header">Provide Complaint Specific Details</h3>

      {/* Row 6 */}
      <textarea
        className="details-textarea"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Enter specific details about your complaint..."
      />

      {/* Row 7 */}
      <button className="submit-button">
        <span role="img" aria-label="building">🏢</span> SUBMIT
      </button>
    </div>
  );
};

export default FormSETNAMEScreen;

