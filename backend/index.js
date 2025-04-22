// backend/index.js
import express from 'express';
import cors from 'cors';
import openaiProxy from './openaiProxy.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(openaiProxy); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
