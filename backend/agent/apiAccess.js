// Import necessary libraries
import fs from "fs";

import { PERP_API_KEY } from "../config.js";

// Read the formsDescriptions.txt file and store it in a variable
const prompt = fs.readFileSync("./data/prompt.txt", "utf8");
const formsDescriptions = fs.readFileSync("./data/formsDescriptions.txt", "utf8");

// Initialize a function to generate form responses
async function generateFormResponse(query) {

  // Build the request payload
  const apiRequestJson = {
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      { role: "system", content: formsDescriptions},
      { role: "system", content: prompt},
      { role: "user", content: query}
    ],
    max_tokens: 256,
    temperature: 0.2,
    top_p: 0.9,
    return_citations: false,
    search_domain_filter: ["perplexity.ai"],
    return_images: false,
    return_related_questions: false,
    top_k: 0,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 1,
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PERP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiRequestJson),
  };

  // Send request as a JSON string
  const response = await fetch("https://api.perplexity.ai/chat/completions", options)

  const jsonResponse = await response.json(); // Convert response to JSON
  return jsonResponse;

}

// Example usage:
// const input = {
//   Problem:
//     "I need to draft a lease agreement for my new apartment, but I'm not sure which form to use. Can you help me find the right one and fill it out with the details of the property, the tenant, and the lease terms?",
//   AdditionalInformation:
//     "The property is located at 123 Main St, Springfield, and the tenant's name is John Doe. The lease starts on January 1, 2024, and ends on December 31, 2024. The monthly rent is $1200.",
// };

async function output(input) {
  console.log(input.Problem)
  
  return new Promise((resolve) => {
    const result = generateFormResponse(input.Problem);
    resolve(result);
  });
  
}

export default output;
