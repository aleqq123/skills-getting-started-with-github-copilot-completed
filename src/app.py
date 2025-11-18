"""
High School Management System API

A super simple FastAPI application that allows students to view and sign up
for extracurricular activities at Mergington High School.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mergington High School API",
              description="API for viewing and signing up for extracurricular activities")

# Configure CORS to allow requests from React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory activity database
activities = {
    "Chess Club": {
        "description": "Learn strategies and compete in chess tournaments",
        "schedule": "Fridays, 3:30 PM - 5:00 PM",
        "max_participants": 12,
        "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
    },
    "Programming Class": {
        "description": "Learn programming fundamentals and build software projects",
        "schedule": "Tuesdays and Thursdays, 3:30 PM - 4:30 PM",
        "max_participants": 20,
        "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
    },
    "Gym Class": {
        "description": "Physical education and sports activities",
        "schedule": "Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM",
        "max_participants": 30,
        "participants": ["john@mergington.edu", "olivia@mergington.edu"]
    },
    "Soccer Team": {
        "description": "Practice and compete in interschool soccer matches",
        "schedule": "Tuesdays and Thursdays, 4:00 PM - 5:30 PM",
        "max_participants": 25,
        "participants": ["lucas@mergington.edu", "mia@mergington.edu"]
    },
    "Swimming Club": {
        "description": "Improve swimming techniques and participate in competitions",
        "schedule": "Mondays and Wednesdays, 3:30 PM - 5:00 PM",
        "max_participants": 20,
        "participants": ["noah@mergington.edu", "ava@mergington.edu"]
    },
    "Art Studio": {
        "description": "Explore painting, drawing, and mixed media techniques",
        "schedule": "Wednesdays, 3:30 PM - 5:00 PM",
        "max_participants": 15,
        "participants": ["isabella@mergington.edu", "ethan@mergington.edu"]
    },
    "Theater Group": {
        "description": "Acting, stage performance, and drama production",
        "schedule": "Mondays and Thursdays, 4:00 PM - 6:00 PM",
        "max_participants": 30,
        "participants": ["sophia@mergington.edu", "liam@mergington.edu"]
    },
    "Debate Team": {
        "description": "Develop argumentation and public speaking skills",
        "schedule": "Tuesdays, 3:30 PM - 5:00 PM",
        "max_participants": 16,
        "participants": ["william@mergington.edu", "charlotte@mergington.edu"]
    },
    "Science Olympiad": {
        "description": "Compete in science and engineering challenges",
        "schedule": "Fridays, 3:00 PM - 5:00 PM",
        "max_participants": 18,
        "participants": ["james@mergington.edu", "amelia@mergington.edu"]
    }
}


@app.get("/activities")
def get_activities():
    return activities


@app.post("/activities/{activity_name}/signup")
def signup_for_activity(activity_name: str, email: str):
    """Sign up a student for an activity"""
    # Validate activity exists
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")

    # Get the specific activity
    activity = activities[activity_name]

    # Validate student is not already signed up
    if email in activity["participants"]:
        raise HTTPException(status_code=400, detail="Student already signed up for this activity")
    
    # Add student
    activity["participants"].append(email)
    return {"message": f"Signed up {email} for {activity_name}"}


@app.delete("/activities/{activity_name}/unregister")
def unregister_from_activity(activity_name: str, email: str):
    """Unregister a student from an activity"""
    # Validate activity exists
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")

    # Get the specific activity
    activity = activities[activity_name]

    # Validate student is signed up
    if email not in activity["participants"]:
        raise HTTPException(status_code=400, detail="Student not signed up for this activity")
    
    # Remove student
    activity["participants"].remove(email)
    return {"message": f"Unregistered {email} from {activity_name}"}
