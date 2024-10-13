import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './formScreen.css';

const FormScreen = () => {
  const [formData, setFormData] = useState({
    title:"",
    name: "",
    surname: "",
    city: "",
    company_name: "",
    complaint_type: "",
  });

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
      console.log(data.data)

      // Safely check if data and data.data exist
      if (data && data.data) {
        updateFormDataFromApiResponse(data.data)   
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateFormDataFromApiResponse = (data) => {
    setFormData({
      title: data.employee_details.title || " ",
      first_name: data.employee_details.first_name || " ",
      surname: data.employee_details.surname || " ",
      city: data.employee_details.town || " ", 
      position_held: data.employee_details.company_name || " ",
      complaint_type: data.complaint_details.complaint_type || " ",
    });
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Update the specific field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData); // Log formData in a formatted way
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">Back to Auxilium Home</button>
  
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1 className="title">Workplace Relations Commission</h1>
          <h2 className="auxilium">Autofill Powered By AUXILIUM</h2>
        </div>
  
        <h3 className="details-header">Employee Details</h3>
        <div className="employee-details">
          <input
            type="text"
            name="title" 
            placeholder="Title"
            value={formData.title || ""} 
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name || ""} 
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname || ""} 
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city || ""} 
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="position_held"
            placeholder="Position Held"
            value={formData.company_name || ""} 
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="complaint_type"
            placeholder="Complaint Type"
            value={formData.complaint_type || ""} 
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-button">
          <span role="img" aria-label="building">🏢</span> SUBMIT
        </button>
      </form>
    </div>
  );
};

export default FormScreen;
