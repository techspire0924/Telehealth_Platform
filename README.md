# Telehealth Platform

A comprehensive telehealth application designed to facilitate remote patient management, virtual consultations, and intelligent symptom analysis via an integrated chatbot.

## Table of Contents
- [Requirements](#requirements)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Diagram](#system-diagram)
- [Installation Guide](#installation-guide)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [License](#license)

## Requirements
- **Node.js** (v14 or higher) and **npm/yarn** for the frontend and backend
- **Python** (v3.7 or higher) and a virtual environment for the symptom prediction service
- [Optional] **Docker** for containerized deployment

## Features
- **User Interface:** Responsive frontend built with React and Vite.
- **Real-time Communication:** Seamless integration between frontend and backend components.
- **Virtual Consultations:** Support for patient-doctor interactions.
- **Symptom Prediction:** Machine learning analysis using a pre-trained ANN model.
- **Chatbot Integration:** AI-powered chatbot for primary symptom assessment.
- **Secure Authentication:** User management and authorization to ensure data privacy.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS  
  ([vite.config.js](frontend/vite.config.js), [tailwind.config.js](frontend/tailwind.config.js))
- **Backend:** Node.js (check [server/backend/index.js](server/backend/index.js) for details)
- **Symptom Prediction Service:** Python with a pre-trained ANN model ([app.py](server/symptoms_prediction/app.py))
- **Styling:** CSS with Tailwind & PostCSS ([postcss.config.js](frontend/postcss.config.js))

## System Diagram

```
          +-------------------+
          |    End Users      |
          +---------+---------+
                    |
                    V
          +-------------------+        REST API calls
          |   Frontend App    | <----------------------+
          | (React & Vite)    |                        |
          +---------+---------+                        |
                    |                                  |
                    V                                  |
          +-------------------+                        |
          |   Backend API     | -----------------------+
          |    (Node.js)      |
          +---------+---------+
                    |
                    V
          +-------------------------+
          | Symptom Prediction      |
          |   Service (Python)      |
          +-------------------------+
```

## Installation Guide

### Frontend Setup
1. Navigate to the `frontend` directory:
    ````sh
    cd frontend
    ````
2. Install dependencies:
    ````sh
    npm install
    ````
3. Start the development server:
    ````sh
    npm run dev
    ````

### Backend Setup
1. Navigate to the `server/backend` directory:
    ````sh
    cd server/backend
    ````
2. Install dependencies:
    ````sh
    npm install
    ````
3. Start the backend server in development mode:
    ````sh
    npm run start-dev
    ````

### Symptom Prediction Service Setup
1. Navigate to the `server/symptoms_prediction` directory:
    ````sh
    cd server/symptoms_prediction
    ````
2. Set up a Python virtual environment:
    ````sh
    python -m venv venv
    source venv/bin/activate      # On Windows use: venv\Scripts\activate
    ````
3. Install the required Python packages:
    ````sh
    pip install -r requirements.txt
    ````
4. Run the Python application:
    ````sh
    python app.py
    ````

## Running the Application
- **Frontend:** Available at [http://localhost:3000](http://localhost:3000) (or as printed in your terminal).
- **Backend:** Accessible at [http://localhost:5000](http://localhost:5000) or a custom port as configured.
- **Symptom Prediction Service:** Running on the port specified in your Python app configuration (commonly [http://localhost:8000](http://localhost:8000)).

## Project Structure

```
Telehealth_Platform/
├── README.md
├── frontend/
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── Dashboard/
│       ├── hooks/
│       ├── layout/
│       ├── pages/
│       ├── routes/
│       └── utils/
└── server/
    ├── backend/
    │   ├── .gitignore
    │   ├── index.js
    │   ├── package.json
    │   ├── auth/
    │   ├── Controllers/
    │   ├── models/
    │   └── Routes/
    └── symptoms_prediction/
        ├── ann_model.pkl
        ├── app.py
        ├── Doctor_Versus_Disease.csv
        └── ... other files ...
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
