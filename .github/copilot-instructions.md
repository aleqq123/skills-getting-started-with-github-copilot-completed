# Mergington High School Activities API - Copilot Instructions

## Architecture Overview

This is a FastAPI + vanilla JavaScript web application for managing school extracurricular activities. The architecture consists of:

- **Backend**: `src/app.py` - FastAPI server with in-memory data storage (no database)
- **Frontend**: `src/static/` - Vanilla JavaScript SPA (index.html, app.js, styles.css)
- **Tests**: `tests/test_app.py` - Pytest-based API tests using FastAPI TestClient

**Critical**: Data is stored in-memory in the `activities` dictionary in `app.py`. All data resets on server restart.

## Development Workflow

### Running the Application
```bash
# From workspace root
python src/app.py
# OR use venv if configured
.venv/bin/python src/app.py
```
Server runs on `http://localhost:8000`, root redirects to `/static/index.html`

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
- **Event delegation**: Delete buttons use event delegation on `activitiesList` container
- **Data attributes**: Store context in `data-activity` and `data-email` attributes
- **Auto-refresh**: Call `fetchActivities()` after mutations (signup/unregister) to sync UI
- **No framework**: Pure vanilla JavaScript with async/await for fetch calls

Example from `app.js`:
```javascript
// Event delegation pattern for dynamically added delete buttons
activitiesList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const activity = event.target.dataset.activity;
    const email = event.target.dataset.email;
    // ... handle delete
  }
});
```

### CSS Architecture
- **No preprocessor**: Plain CSS with BEM-like naming (`.participants-list`, `.delete-btn`)
- **List styling override**: Participant lists use `list-style-type: none` with flexbox layout
- **Hover effects**: Buttons use opacity and transform transitions

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
2. Update `fetchActivities()` or add new fetch function in `app.js`
3. Add comprehensive tests in `tests/test_app.py` with success/error cases
4. Update `src/README.md` API table

### Adding UI Features
1. Modify HTML structure in `index.html`
2. Add event handlers in `app.js` using event delegation for dynamic content
3. Style in `styles.css` following existing naming conventions
4. **Always call `fetchActivities()` after mutations** to refresh UI

### Modifying Data Model
1. Update `activities` dictionary structure in `app.py`
2. Update `reset_activities` fixture in `tests/test_app.py` with new structure
3. Adjust frontend rendering in `app.js` to match new data shape

## Known Quirks

- **Activity names as IDs**: Activities use display names as identifiers, so renaming breaks references
- **No validation**: Email format, max participants limits are not enforced in code
- **Static files mounting**: FastAPI serves static files from `/static` route, not root
- **URL encoding**: Always use `encodeURIComponent()` for activity names in fetch URLs (e.g., "Chess Club" → "Chess%20Club")
