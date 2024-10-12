import { createWorker } from 'tesseract.js';

async function processImage(imagePath) {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();
  return text;
}

// Function to handle the image submission and send the response back
const handleImageSubmission = async (req, res) => {
  const imagePath = './data/tmp/test1.png'; // hardcoded for now

  try {
    
    const extractedText = await processImage(imagePath);
    
    // Send a success response
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Text from image successfully parsed",
        data: extractedText,
      })
    );
    return extractedText;

  } catch (error) {
    console.error('Error processing image:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

export default handleImageSubmission;