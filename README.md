# CSDS395
# CSDS395 - Dermatology AI Diagnostics

## Project Overview
Dermatology AI Diagnostics is a web-based platform that uses AI to classify skin conditions from images. Users can upload images, and the system will return possible diagnoses with a confidence score.

## Tech Stack
- **Frontend:** React.js (for user interface)
- **Backend:** Flask (to serve API and process requests)
- **AI Model:** TensorFlow/Keras (for skin condition classification)
- **Database:** MongoDB/PostgreSQL (for storing user interactions)

## Repository Structure
- `frontend/` → Contains React frontend code
- `backend/` → Flask API handling image uploads and AI inference
- `ai_model/` → CNN model for skin condition classification
- `data/` → Datasets and preprocessing scripts
- `docs/` → Project reports and documentation
- `tests/` → Unit tests for model, backend, and frontend

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CSDS395.git
   cd CSDS395
2. Install Dependencies
    pip install -r requirements.txt  # For backend
    npm install  # For frontend (inside frontend directory)
3. Run application
    cd backend
    python app.py

