import http from 'http';
import output from './agent/apiAccess.js';
import handleSubmit from './routes/submit.js';


// Create an async function to handle requests
const requestHandler = async (req, res) => {
    // Handle POST requests to /submit
    if (req.method === 'POST' && req.url === '/submit') {
        try {
            const response = await handleSubmit(req, res);
            console.log(response);
            console.log(output);
            
        } catch (error) {
            console.error('Error handling submission:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else {
        // Handle other routes or methods
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
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