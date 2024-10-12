// Import necessary libraries
import axios from 'axios';
import fs from 'fs';

// Read the formsDescriptions.txt file and store it in a variable
const formsFile = fs.readFileSync('./data/formsDescriptions.txt', 'utf8');
//const formsJson = JSON.parse(formsFile);

// Set up API keys for LLaMA-3 and Groq
const llamaApiKey=process.env.LLAMA_API_KEY;
const groqApiKey=process.env.GROQ_API_KEY;

// Initialize a function to fetch and filter relevant forms
async function fetchAndFilterForms(input) {
  // Use Groq API to fetch relevant forms
  const response = await axios.post(
    'https://api.groq.ai/v1/search',
    {
      'query': input,
      'limit': 5
    },
    {
      headers: {
        'Authorization': `Bearer ${groqApiKey}`
      }
    }
  );

  // Filter fetched forms based on input
  const filteredForms = response.data.results.filter((form) => {
    return form.name.toLowerCase().includes(input.toLowerCase());
  });

  return filteredForms;
}

// Initialize a function to generate form responses
async function generateFormResponse(input, additionalInfo) {
  // Use LLaMA-3 to generate a form response
  const response = await axios.post(
    'https://api.llama-api.com/',
    {
      'prompt': input,
      'max_tokens': 256
    },
    {
      headers: {
        'Authorization': `Bearer ${llamaApiKey}`
      }
    }
  );

  // Process the generated response
  const output = response.data.choices[0].text;

  // Combine input and additional info with generated response
  const combinedInfo = { ...input, ...additionalInfo, output };

  return combinedInfo;
}

// Initialize a function to answer user queries
async function answerQuery(query, additionalInfo) {
  // Fetch and filter relevant forms based on the query
  const forms = await fetchAndFilterForms(query);

  // If no forms are found, return an error message
  if (forms.length === 0) {
    return 'No relevant forms found for the given query.';
  }

  // Generate a form response using LLaMA-3
  const formResponse = await generateFormResponse(query, additionalInfo);

  // Fill in the blanks with correct information according to the form structure
  const filledForm = forms[0].template.replace(/\{(\w+)\}/g, (match, key) => {
    return formResponse[key] || '';
  });

  return filledForm;
}

// Example usage:
const input = {
  Problem: "I need to draft a lease agreement for my new apartment, but I'm not sure which form to use. Can you help me find the right one and fill it out with the details of the property, the tenant, and the lease terms?",
  AdditionalInformation: "The property is located at 123 Main St, Springfield, and the tenant's name is John Doe. The lease starts on January 1, 2024, and ends on December 31, 2024. The monthly rent is $1200."
};

async function output(){
    const result = await answerQuery(input.Problem, input.AdditionalInformation);
    console.log(result);
};


export default answerQuery;