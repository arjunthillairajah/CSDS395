// backend/index.js
import express from "express";
import cors    from "cors";
import dotenv  from "dotenv";
import OpenAI  from "openai";        // default export

// 1) load .env from this folder
dotenv.config({ path: "./.env" });

// 2) debug
console.log("🔑 Loaded API KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// 3) init OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/gpt", async (req, res) => {
  try {
    const { messages, model = "gpt-4o", temperature = 0.7 } = req.body;

    // 4) call chat completion
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature
    });

    // 5) send back the full response
    res.json(completion);
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
