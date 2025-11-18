# Mergington High School Activities API - Copilot Instructions

## Architecture Overview

This is a **React + FastAPI** web application for managing school extracurricular activities. The architecture consists of:

- **Backend**: `src/app.py` - FastAPI API server with in-memory data storage (no database)
- **Frontend**: `frontend/` - React SPA built with Vite (components, API utilities, styles)
- **Tests**: `tests/test_app.py` - Pytest-based API tests using FastAPI TestClient

**Critical**: Data is stored in-memory in the `activities` dictionary in `app.py`. All data resets on server restart.

## Development Workflow

### Running the Backend
```bash
# From workspace root
python src/app.py
# OR use venv if configured
.venv/bin/python src/app.py
```
Backend API server runs on `http://localhost:8000`

### Running the Frontend
```bash
# From workspace root
cd frontend
npm run dev
```
React dev server runs on `http://localhost:5173`

**Development setup**: Run both servers simultaneously. Vite proxies API requests to `http://localhost:8000` automatically.

### Running Tests
```bash
# Always use the venv Python
.venv/bin/python -m pytest tests/ -v
```
**Important**: Tests use `autouse` fixture to reset `activities` state before each test. Never modify global state without resetting.

### Python Environment
This project uses a `.venv` virtual environment. Always prefix Python commands with `.venv/bin/python` or configure environment first using the Python extension.

## Code Patterns & Conventions

### Backend API Design
- **RESTful endpoints** with activity name as path parameter (not ID)
- **Query parameters** for email: `/activities/{activity_name}/signup?email=student@mergington.edu`
- **HTTPException** for errors with appropriate status codes (400/404)
- **In-memory mutations**: Directly modify `activities` dict, no persistence layer

Example from `app.py`:
```python
@app.post("/activities/{activity_name}/signup")
def signup_for_activity(activity_name: str, email: str):
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")
    activity["participants"].append(email)
    return {"message": f"Signed up {email} for {activity_name}"}
```

### Frontend Patterns
- **React components**: Functional components with hooks (useState, useEffect)
- **API integration**: Centralized in `frontend/src/api.js` with fetch calls
- **State management**: Local component state, lifted to App.jsx for shared data
- **Auto-refresh**: Call `loadActivities()` after mutations (signup/unregister) to sync UI
- **URL encoding**: Always use `encodeURIComponent()` for activity names in API calls

Example component pattern:
```javascript
function ActivityCard({ name, details, onUnregister }) {
  const handleDelete = (email) => {
    if (window.confirm(`Are you sure...`)) {
      onUnregister(name, email);
    }
  };
  // ... render logic
}
```

### CSS Architecture
- **Plain CSS**: Imported into React via `index.css`
- **Class-based styling**: Traditional CSS classes (`.participants-list`, `.delete-btn`)
- **Color scheme**: `#1a237e` (primary), `#0066cc` (secondary), `#3949ab` (hover)
- **Responsive**: Basic media query at 768px breakpoint

### CORS Configuration
- **Development**: Backend allows `http://localhost:5173` (Vite default port)
- **Configured in**: `src/app.py` via `CORSMiddleware`
- **Scope**: All methods and headers allowed for development convenience
- **Production**: Update `allow_origins` list in `app.py` for deployed frontend URL

## Testing Conventions

### Test Structure
- **Class-based organization**: Tests grouped by endpoint/feature (e.g., `TestSignup`, `TestUnregister`)
- **Fixtures**: Use `client` fixture for TestClient, `reset_activities` autouse fixture for state
- **Integration tests**: `TestIntegration` class for multi-step workflows

### Test Data Reset Pattern
```python
@pytest.fixture(autouse=True)
def reset_activities():
    original_activities = {...}  # Full copy
    activities.clear()
    activities.update(original_activities)
    yield
    # Reset after test too
```
**Always use this pattern** when testing stateful operations to avoid test pollution.

## Common Tasks

### Adding a New Endpoint
1. Add route handler in `app.py` following existing patterns (activity name in path, email in query)
2. Add new API function in `frontend/src/api.js` with proper URL encoding
3. Add comprehensive tests in `tests/test_app.py` with success/error cases
4. Update `src/README.md` API table

### Adding UI Features
1. Create or modify React component in `frontend/src/components/`
2. Add state management in component or lift to App.jsx if shared
3. Update styles in `frontend/src/index.css` following existing naming conventions
4. **Always call `loadActivities()` after mutations** to refresh UI

### Modifying Data Model
1. Update `activities` dictionary structure in `app.py`
2. Update `reset_activities` fixture in `tests/test_app.py` with new structure
3. Adjust React component rendering to match new data shape (e.g., in ActivityCard.jsx)
2. Update `reset_activities` fixture in `tests/test_app.py` with new structure
3. Adjust React component rendering to match new data shape (e.g., in ActivityCard.jsx)

## Known Quirks

- **Activity names as IDs**: Activities use display names as identifiers, so renaming breaks references
- **No validation**: Email format, max participants limits are not enforced in code
- **URL encoding**: Always use `encodeURIComponent()` for activity names in fetch URLs (e.g., "Chess Club" → "Chess%20Club")
- **CORS in development**: Backend explicitly allows `localhost:5173` for React dev server

## Known Quirks

- **Activity names as IDs**: Activities use display names as identifiers, so renaming breaks references
- **No validation**: Email format, max participants limits are not enforced in code
- **Static files mounting**: FastAPI serves static files from `/static` route, not root
- **URL encoding**: Always use `encodeURIComponent()` for activity names in fetch URLs (e.g., "Chess Club" → "Chess%20Club")
