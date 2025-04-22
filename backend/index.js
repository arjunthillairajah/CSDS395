import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiProxy from './openaiProxy.js';


dotenv.config();


console.log("🔑 API KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use(openaiProxy); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
