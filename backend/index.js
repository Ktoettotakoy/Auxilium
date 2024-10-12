import http from "http";

// import agent functions
import output from "./agent/apiAccess.js";

// import route /submit
import handleSubmit from "./routes/submit.js";
import sendResponseBack from "./routes/sendResponseBack.js";

let submittedData = null;

// Create an async function to handle requests
const requestHandler = async (req, res) => {
  // Handle POST requests to /submit
  if (req.method === "POST" && req.url === "/submit") {
    try {
      
      // retrieve data from 
      const submittedJson = await handleSubmit(req, res);
      
      // debug print
      console.log(submittedJson);
      
      
      const response = await output(submittedJson);
      console.log(response.choices[0].message.content);
      submittedData = response.choices[0].message.content;

    } catch (error) {
      console.error("Error handling submission:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } 
  // Handle GET requests to /sendResponseBack
  else if (req.method === "GET" && req.url === "/getResponse") {
    // Check if there is data to send back
    await sendResponseBack(req, res, submittedData);
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

//initAI
