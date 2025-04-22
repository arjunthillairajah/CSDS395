// backend/openaiProxy.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
console.log("🔑 API KEY:", process.env.OPENAI_API_KEY);


dotenv.config(); 

const router = express.Router();

router.post('/api/gpt', async (req, res) => {
  try {
    const messages = req.body.messages;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages
      })
    });

    const data = await openaiRes.json();
    res.json(data);

  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
});

export default router;
