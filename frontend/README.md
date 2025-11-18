# Mergington High School Activities - React Frontend

React frontend for the Mergington High School extracurricular activities management system.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Plain CSS** - Styling (no CSS framework)

## Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ActivitiesList.jsx
│   │   ├── ActivityCard.jsx
│   │   ├── SignupForm.jsx
│   │   └── MessageDisplay.jsx
│   ├── api.js            # API integration utilities
│   ├── index.css         # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## Development

### Prerequisites

- Node.js 18+ and npm
- FastAPI backend running on http://localhost:8000

### Installation

```bash
npm install
```

### Running the Dev Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

### Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `GET /activities` - Fetch all activities
- `POST /activities/{name}/signup?email={email}` - Sign up for activity
- `DELETE /activities/{name}/unregister?email={email}` - Unregister from activity

In development, Vite proxies API requests to `http://localhost:8000` (configured in `vite.config.js`).

For production, set the `VITE_API_URL` environment variable to your backend URL.

## Features

- View all extracurricular activities with details
- See current participants for each activity
- Sign up for activities with email validation
- Unregister from activities with confirmation dialog
- Real-time UI updates after mutations
- Responsive design for mobile and desktop
- Auto-hiding success/error messages

## Component Overview

- **App.jsx**: Main component managing state and data fetching
- **Header/Footer**: Static layout components
- **ActivitiesList**: Displays all activities in cards
- **ActivityCard**: Individual activity display with participants
- **SignupForm**: Form for signing up to activities
- **MessageDisplay**: Shows success/error messages
