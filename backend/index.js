import http from "http";

// import agent functions
import output from "./agent/apiAccess.js";

// import route /submit
import handleSubmit from "./routes/submit.js";
import sendResponseBack from "./routes/sendResponseBack.js";
import handleFileUpload from "./routes/upload.js"

import handleImageSubmission from "./utils/getTextFromImg.js"

let submittedData = null;

// Function to handle requests to the server
const requestHandler = async (req, res) => {
  
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow these methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers

  // Handle OPTIONS (Preflight request for CORS)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No content
    res.end();
    return;
  }
  
  // Handle POST requests to /submit
  if (req.method === "POST" && req.url === "/submit") {
    try {
      // retrieve data from user input fields
      const submittedJson = await handleSubmit(req, res);
      if (!submittedJson) { return };

      // debug print
      // console.log(submittedJson);

      const response = await output(submittedJson);
      if (!response){
        return;
      }
      // debug print
      // console.log(response.choices[0].message.content);

      // update "global" variable that it used to pass output back to the client
      submittedData = response.choices[0].message.content;

      console.log(submittedData)

    } catch (error) {
      console.error("Error handling submission:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }
  else if (req.method === "GET" && req.url === "/processIMG"){
    const imgTxt = await handleImageSubmission(req, res, './data/tmp/test1.png');
    console.log(imgTxt);
  }
  else if (req.method === "GET" && req.url === "/getResponse") {
    // Handle GET requests to /sendResponseBack
    // Check if there is data to send back
    if (submittedData){
      await sendResponseBack(req, res, submittedData);
    }
    
  } else if (req.method === "POST" && req.url === "/upload") {
    
    const imagePath = await handleFileUpload(req, res);

    try {
      // Call the async function to process the image and extract text
      const text = await handleImageSubmission(req, res, imagePath);
      submittedData = {
        ...submittedData,
        AdditionalInformation: text
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to extract text from image" }));
    }
    }
  else {
    // Handle other routes or methods
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
};

// Create the server
const server = http.createServer(requestHandler);

// Define the port the server will listen on
const PORT = process.env.PORT || 50505;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
