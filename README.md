# Auxilium

## Help Irish citizens to find a right form to fill in

### How to?
- git clone your fork
- cd in frontend and backend folders and run ```npm i``` to install all node dependencies
- create a ```.env``` file in the ```/backend``` folder and add the 
```PERP_API_KEY=<your perplexity api key>``` to run the ai agent
- run the project from the home directory ```npm run dev``` which opens the web app up in your browser.

### Why use this?
- Filling obscure forms that won't open in the browser and need you to install extra software.
- Automate filling long forms
- Finding the correct forms to fill without knowing the exact form before hand, the ai agent looks through the knowledge base to suggest the most appropriate form for you to fill.
- In case the agent can't find any forms for your case, it suggests actual useful website or phone numbers depending on the domain of the problem.
