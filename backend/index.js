// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiProxy from './openaiProxy.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// 1) Compute the directory name of this script (ESM __dirname)
const __dirname = dirname(fileURLToPath(import.meta.url));

// 2) Explicitly load the .env file from the backend folder
dotenv.config({ path: join(__dirname, '.env') });

// 3) Debug output: verify that the API key was loaded
console.log('📂 Script directory (__dirname):', __dirname);
console.log('🔑 Loaded API KEY:', process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(openaiProxy);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
