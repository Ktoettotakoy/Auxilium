import validateInput from "../utils/validation.js"

const handleSubmit = async (req, res) => {
    let body = '';
  
    // Listen for data
    req.on('data', (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });
  
    // When the whole body has been received
    return new Promise((resolve) => {
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body); // Parse the JSON string
                
                // Validate the input data
                const validated = validateInput(parsedData);
                if (!validated.isValid) {
                    res.writeHead(validated.errorCode, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: validated.message }));
                    resolve(); // Resolve the promise after sending the response
                    return; // Early return to avoid further processing
                }

                // Process the data (log it, save it, etc.)
                const savedMessageJSON = parsedData; // Save or process as needed

                // Send a success response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received successfully!', data: savedMessageJSON }));

                resolve(savedMessageJSON); // Resolve the promise with the response data
            } catch (error) {
                // Handle JSON parsing error
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
                resolve(); // Resolve even in error case to finish the promise
            }
        });
    });
  };
  
  export default handleSubmit;