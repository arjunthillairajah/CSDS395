import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './app.css'
import { useState } from 'react';

import ChatBox from './ChatBox';



function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('No image uploaded.');
      setResult(null);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('https://noble-mature-tapir.ngrok-free.app/predict', { 
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setResult(`Prediction: ${result.label}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to get a prediction.");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="container">
      <h2 className="title">Dermatology AI Diagnostics</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
      {preview && <img src={preview} className="preview-img" />}
      <br />

      {!result && (
        <button onClick={handleSubmit} className="analyze-btn" disabled={loading}>
          {loading ? (
            <span className="spinner">
              <span className="spinner-circle" /> Loading...
            </span>
          ) : (
            'Analyze Image'
          )}
        </button>
      )}

      {result && (
        <>
          <div className="result-message">{result}</div>
          <button onClick={handleReset} className="reset-btn">Analyze Another Image</button>
        </>
      )}
    </div>
    <ChatBox />
    </>
  );
}

export default App;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
