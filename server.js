const express = require("express");
const path = require('path');
const { OpenAI } = require("openai");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front_end')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api12/scan/ak", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Missing barcode" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if cheaper
      messages: [
        {
          role: "system",
          content: "You're a helpful food and health assistant. You try to guess the food product from the barcode and provide possible ingredients and health-related advice."
        },
        {
          role: "user",
          content: `I scanned this barcode: ${code}. What food product could this be? Is it healthy? Give ingredients explanation, a health score, and a quick summary.`
        }
      ],
      temperature: 0.7
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});