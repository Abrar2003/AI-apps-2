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
  res.json({ message: response.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
