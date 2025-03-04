import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('No image uploaded.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://xxxx.ngrok.io/', {  // TODO: replace with ngrok from prediction
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      alert(`Prediction: ${result.label}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to get a prediction.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Dermatology AI Diagnostics</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
      {preview && <img src={preview} className="preview-img" />}
      <br />
      <button onClick={handleSubmit} className="analyze-btn">Analyze Image</button>
    </div>
  );
}

export default App;
