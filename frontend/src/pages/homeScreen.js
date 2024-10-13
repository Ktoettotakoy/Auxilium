import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homeScreen.css'; // Import the CSS file

const HomeScreen = () => {
  const [userInput, setUserInput] = useState("");
  const [formName, setFormName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [problemData, setProblemData] = useState({
    Problem: "",
    AdditionalInformation: ""
  });
  
 const navigate = useNavigate();

 // handle file selection
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);

    // Create FormData to send the file
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:50505/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      setProblemData(prevState => ({
        ...prevState,
        AdditionalInformation: result.data
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
};

useEffect(() => {
  console.log("Updated problemData:", problemData);
}, [problemData]);

 // Function to handle submission
 const handleSubmit = async () => {
  const updatedProblemData = {
    ...problemData,
    Problem: userInput,
  };
   console.log(updatedProblemData)
   try {
     const response = await fetch('http://localhost:50505/submit', {
       method: 'POST', // HTTP method
       headers: {
         'Content-Type': 'application/json', // Set content type to JSON
       },
       body: JSON.stringify(updatedProblemData), // Convert the data to JSON
     });

     if (!response.ok) {
       throw new Error('Network response was not ok');
     }

     const tmpRes = await response.json(); // Parse the response JSON
     console.log(tmpRes); // Log result for debugging

     // wait for 2 seconds to make the POST happen
     await new Promise(resolve => setTimeout(resolve, 2000));

     const aiResponse = await fetch('http://localhost:50505/getResponse', {
       method: 'GET', // HTTP method
       headers: {
         'Content-Type': 'application/json', // Set content type to JSON
       },
     });
     
     if (!aiResponse.ok) {
       throw new Error('Failed to fetch AI response');
     }

     const result = await aiResponse.json(); // Parse the response JSON

     // Extract form_name from the response and set it to formName state
     if (result.data) {
       const parsedData = JSON.parse(result.data); // Assuming the result.data is a JSON string
       setFormName(parsedData.form_name); // Update state with form name
     }
     console.log("SENT")

   } catch (error) {
     console.error('There was a problem with the fetch operation:', error);
   }
 };

 const handleGoToSpecificForm = () => {
  switch (formName) {
    case "Workplace Relations Form":
      navigate(`/formScreen`);
      break;
    case "Small Claims Form":
      console.log("HIIIIIIII");
      break;

    default:
      break;
  }
};

 return (
   <div className="container">
     <h1 className="header">Auxilium</h1>
       
     {/* Two-column layout */}
     <div className="two-column-layout">
       
       {/* Column - User input and file upload */}
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
              <input
                type="file"
                onChange={handleFileChange} // Handle file selection
                style={{ display: 'none' }} // Hide default file input
                id="file-upload" // ID for label
              />
              <label htmlFor="file-upload" className="icon-button">
                <span role="img" aria-label="paperclip">📎</span> Upload File
              </label>
            </div>
          </div>
        </div>

       {/* Column - Action buttons */}
       <div className="column">
         <div className="action-buttons">
           <button onClick={handleGoToSpecificForm}>
             {formName ? `Fill out the ${formName}` : '...'}
           </button>
           <button>...</button>
           <button>...</button>
         </div>
         <div className="submit-button">
           <button className="generate-button" onClick={handleSubmit}>Generate Actions</button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default HomeScreen;