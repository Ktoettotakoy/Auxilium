import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './formScreen.css';

const FormScreen = () => {
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

      // Safely check if data and data.data exist
      if (data && data.data) {
        setFormData(prevData => ({
          ...prevData,
          employee_details: {
            ...prevData.employee_details,
            ...(data.data.employee_details || {}) // Merge with existing or use default
          },
          employment_details: {
            ...prevData.employment_details,
            ...(data.data.employment_details || {})
          },
          pay_details: {
            ...prevData.pay_details,
            ...(data.data.pay_details || {})
          },
          employer_details: {
            ...prevData.employer_details,
            ...(data.data.employer_details || {})
          },
          complaint_details: {
            ...prevData.complaint_details,
            ...(data.data.complaint_details || {})
          }
        }));
      } else {
        console.error('Unexpected data structure:', data);
      }
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
          <h1 className="title">Workplace Relations Commission</h1>
          <h2 className="auxilium">Autofill Powered By AUXILIUM</h2>
        </div>

        <h3 className="details-header">Employee Details</h3>
        <div className="employee-details">
          <input
            type="text"
            name="employee_details.title" // Use section.field notation
            placeholder="Title"
            // value={formData.employee_details.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="employee_details.first_name"
            placeholder="First Name"
            // value={formData.employee_details.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="employee_details.surname"
            placeholder="Surname"
            // value={formData.employee_details.surname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="employee_details.position_held"
            placeholder="Position Held"
            // value={formData.employee_details.position_held}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="employer_details.company_name"
            placeholder="Company Name"
            // value={formData.employer_details.company_name}
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

export default FormScreen;
