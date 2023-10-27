const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

//CONTEXT AWARE TEXT GEN ROUTE
app.post("/text", async (req, res) => {
  const { messages } = req.body;

  // Make a request to OpenAI to generate context-aware text
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 1,
    n: 1,
    max_tokens: 100,
  });

  // Return the generated message to the client
  res.json({ message: response.choices[0].message });
});

app.post('/summarization', async (req, res) => {
  try {
    const { summaryRequest } = req.body;
    const uploadedFiles = req.files.files;

    // Handle uploaded files
    const fileContents = [];

    // Check if there are multiple files
    if (Array.isArray(uploadedFiles)) {
      for (const file of uploadedFiles) {
        const content = file.data.toString('utf-8');
        fileContents.push(content);
      }
    } else if (uploadedFiles) {
      // If there's only one file, treat it as an array
      const content = uploadedFiles.data.toString('utf-8');
      fileContents.push(content);
    }

    // Create conversation messages with system message and user request
    const messages = [
      { role: 'system', content: 'You are a summarization assistant.' },
      { role: 'user', content: summaryRequest },
      ...fileContents.map((content) => ({ role: 'user', content })),
    ];

    // Request a summary from the OpenAI model
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    // Return the generated summary to the client
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error('Error in /multi-doc-summarization route:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
