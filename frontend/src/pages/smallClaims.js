import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './smallClaims.css';

const SmallClaims = () => {
    const [formData, setFormData] = useState({});
  
    const [specificComplaints, setSpecificComplaints] = useState([]);
    const navigate = useNavigate();
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:50505/getResponse', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Call fetchData when the component mounts
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const [section, field] = name.split('.'); // Use dot notation in input names
  
      // Update the nested object within formData
      setFormData(prevData => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value // Update the specific field
        }
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      console.log(formData); // Log formData in a formatted way
    };
  
    return (
      <div className="container">
        <button onClick={() => navigate('/')} className="back-button">Back to Auxilium Home</button>
  
        <form onSubmit={handleSubmit}> {/* Wrap your form fields in a form element */}
          <div className="header">
            <h1 className="title">Small Claims Application Form</h1>
            <h2 className="auxilium">Autofill Powered By AUXILIUM</h2>
          </div>
  
          <h3 className="details-header">Case Details</h3>
          <div className="case-details">
            <input
              type="text"
              name="case_details.claim_basis"
              placeholder="Claim Basis"
              // value={formData.case_details.claim_basis}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="case_details.claim_goods"
              placeholder="Claim Goods"
              // value={formData.case_details.claim_goods}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="case_details.claim_amount"
              placeholder="Claim Amount"
              // value={formData.case_details.claim_amount}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="case_details.claim_details"
              placeholder="Claim Details"
              // value={formData.case_details.claim_details}
              onChange={handleInputChange}
            />
          </div>

          <h3 className="details-header">Defendant Details</h3>
          <div className="case-details">
            <input
              type="text"
              name="defendant_details.party_type"
              placeholder="Party Type"
              // value={formData.case_details.claim_basis}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.role_case"
              placeholder="Role in case"
              // value={formData.case_details.claim_goods}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.full_name"
              placeholder="Full Name"
              // value={formData.case_details.claim_amount}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.address_line"
              placeholder="Address Line 1"
              // value={formData.case_details.claim_details}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.town"
              placeholder="Town"
              // value={formData.case_details.claim_details}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.country"
              placeholder="Country"
              // value={formData.case_details.claim_details}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="defendant_details.email"
              placeholder="Email"
              // value={formData.case_details.claim_details}
              onChange={handleInputChange}
            />
          </div>
  
          {/* Additional sections would follow the same structure */}
          
          <button type="submit" className="submit-button">
            <span role="img" aria-label="building">🏢</span> SUBMIT
          </button>
        </form>
      </div>
    );
  };
  
  export default SmallClaims;
  