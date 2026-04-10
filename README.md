# 🚦 Accident Intelligence & Prevention Platform (AIPP)

An advanced, AI-powered system designed to predict traffic accidents, model causal relationships, and visually map geospatial danger zones. Built with a high-performance **React frontend** and an **XGBoost machine learning backend**.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
</p>

## ✨ Core Features
* **🧠 ML Predictive Engine**: Utilizes an XGBoost classifier (trained via Colab pipelines) to dynamically estimate situational accident risk and severity.
* **🌍 Geospatial Smart Map**: Integrates `React-Leaflet` and Esri High-Resolution satellite imagery to visualize risk zones interactively.
* **📡 Real-time Telemetry**: Connects natively to browser geolocation APIs to instantly auto-detect and isolate the user's active geographic sector.
* **📊 Visual Diagnostics**: Fully functional dashboard pipelines incorporating Recharts to display causal relationships, SHAP feature importance, and historical temporal analysis.
* **🧬 Glassmorphism UI**: Beautiful, lightweight glassy interface complete with Framer Motion cinematic transitions and clean modern typography.

## 🛠 Tech Stack
* **Frontend Flow**: React (Vite), Tailwind CSS, Framer Motion, Recharts, React-Leaflet
* **Backend Engine**: Python 3, Flask, XGBoost, Scikit-learn, Joblib
* **Data Flow**: Google Colab (Pipeline Engineering) &rarr; Pickle Dumps &rarr; Flask Local API &rarr; Axios Interceptors &rarr; React GUI

## 🚀 Quick Start Guide

### 1. Launch the Neural Engine (Backend)
The Python ML API serves the complex math predictions to the web interface.
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Launch the Interface (Frontend)
Open a new terminal to start the React web application on port `5173`.
```bash
cd frontend
npm install
npm run dev
```

### 3. ML Model Implementation
1. Analyze your raw collision dataset inside the provided `Colab_Pipeline.ipynb`.
2. Extract the resulting `severity_model.pkl`.
3. Drop the model into the backend structure and uncomment the import section in `/backend/app.py` to completely swap the simulation out with live neural telemetry.

---
*Architected for next-generation smart cities and autonomous traffic mitigation.*
