// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiProxy from './openaiProxy.js';

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use(openaiProxy); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

