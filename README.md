# SCHOOL_APIS
# School Management API

This project is a Node.js based API for managing school data with features to add schools and fetch them based on user's location.

---

##  Features

- Add a school (with name, address, latitude, longitude)
- Get all schools
- Sort schools by nearest to user location

---

##  Tech Stack

- Node.js
- Express.js
- MySQL
- OpenRouteService API (for distance)
- Postman for testing

##  API Endpoints

### POST /api/schools
- Add a new school  
- **Request Body:**
```json
{
  "name": "Green Valley High School",
  "address": "Indore",
  "latitude": 22.72,
  "longitude": 75.86
}
