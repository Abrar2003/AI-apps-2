const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const pdf = require("pdf-parse");
const multer = require("multer");

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const PORT = process.env.PORT || 5000;

// Configure Multer for handling file uploads (we'll add more configuration later)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
  res.json({ message: response.choices[0].message.content });
});
// Summarization route
app.post("/summarization", upload.array("files", 10), async (req, res) => {
  try {
    // Handle the uploaded files (both TXT and PDF)
    const uploadedFiles = req.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload at least one valid file." });
    }

    const fileContents = [];

    for (const file of uploadedFiles) {
      let content = "";
      if (file.mimetype === "text/plain") {
        // Read the contents of a TXT file
        content = file.buffer.toString("utf-8");
      } else if (file.mimetype === "application/pdf") {
        // Read the contents of a PDF file
        // let dataBuffer = fs.readFileSync(file);

        const pdfData = await pdf(file.buffer);
        content = pdfData.text;
      }

      fileContents.push(content);
    }

    // Create conversation messages with system message, user request, and file contents
    const summaryRequest = req.body.summaryRequest;
    const messages = [
      { role: "system", content: "You are a summarization assistant." },
      { role: "user", content: "please make the summary of the content from below files" },
      ...fileContents.map((content) => ({ role: "user", content })),
    ];

    // Request a summary from the OpenAI model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Return the generated summary to the client
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in /summarization route:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Multilingual sentiment analysis and emotion recognition route
app.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    // Use the OpenAI GPT-3.5 Turbo model to analyze sentiment and recognize emotions
    const messages = [
      { role: 'system', content: 'You are an emotion recognition assistant.' },
      { role: 'user', content: text },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    // Extract sentiment and emotion analysis results
    const result = response.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error('Error in /analyze route:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
