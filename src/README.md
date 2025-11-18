# Mergington High School Activities API

A FastAPI backend that provides REST API endpoints for managing school extracurricular activities. This backend is designed to work with a separate React frontend.

## Architecture

- **Backend**: FastAPI (this directory) - Pure API server on port 8000
- **Frontend**: React + Vite (`/frontend` directory) - Dev server on port 5173
- **Communication**: CORS-enabled API calls from React to FastAPI

## Features

- View all available extracurricular activities
- Sign up for activities
- Unregister from activities
- Real-time participant tracking

## Getting Started

### Backend Setup

1. Install the dependencies:

   ```bash
   pip install fastapi uvicorn
   ```

2. Run the FastAPI server:

   ```bash
   python src/app.py
   ```

   The API will be available at http://localhost:8000

3. View API documentation:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The React app will be available at http://localhost:5173

### Development Workflow

1. Start the FastAPI backend: `python src/app.py`
2. In a separate terminal, start the React frontend: `cd frontend && npm run dev`
3. Access the application at http://localhost:5173
4. API requests are automatically proxied from React to FastAPI

## API Endpoints

| Method | Endpoint                                                          | Description                                                         |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | `/activities`                                                     | Get all activities with their details and current participant count |
| POST   | `/activities/{activity_name}/signup?email=student@mergington.edu` | Sign up for an activity                                             |
| DELETE | `/activities/{activity_name}/unregister?email=student@mergington.edu` | Unregister from an activity                                     |

## CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` (Vite dev server default). For production deployment, update the `allow_origins` list in `src/app.py` to include your production frontend URL.

## Data Model

The application uses a simple data model with meaningful identifiers:

1. **Activities** - Uses activity name as identifier:

   - Description
   - Schedule
   - Maximum number of participants allowed
   - List of student emails who are signed up

2. **Students** - Uses email as identifier:
   - Name
   - Grade level

All data is stored in memory, which means data will be reset when the server restarts.
