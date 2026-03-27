# Healthcare Support App

A simple full-stack web application where users can submit health-related issues and receive automated responses using a rule-based AI system.

---

## Features

- Submit health issues using a React form
- Get automated rule-based responses
- Save user submissions in MongoDB
- Fetch all submitted records
- Delete a submitted record
- Clean and beginner-friendly UI

---

## Tech Stack

### Frontend

- React.js
- Axios
- CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors

---

## AI Logic (Rule-Based)

The backend checks the `issue` text and returns a response:

- Contains `fever` -> `Take rest and drink fluids.`
- Contains `pain` -> `Stay hydrated and take proper rest.`
- Contains `emergency` -> `Call emergency helpline immediately!`
- Otherwise -> `Our team will contact you soon.`

---

## Project Structure

```text
healthcare-support-app/
  backend/
    controller/
    models/
    routes/
    config/
    index.js
  frontend/
    src/
    package.json
  readme.md
```

---

## Setup Instructions

### 1. Clone the project

```bash
git clone <your-repo-url>
cd healthcare-support-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create backend `.env`

Create `backend/.env` with:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run backend server

```bash
cd backend
node index.js
```

### 5. Install frontend dependencies

```bash
cd frontend
npm install
```

### 6. Run frontend

```bash
cd frontend
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

---

## API Endpoints

Base route: `/api/users`

### 1. Submit Form

- **URL:** `/api/users/submit`
- **Method:** `POST`
- **Body:**

```json
{
  "name": "Deepak",
  "issue": "fever since morning",
  "category": "general"
}
```

- **Success Response (201):**

```json
{
  "message": "Take rest and drink fluids.",
  "data": {
    "_id": "67e4f4c9abc1234567890001",
    "name": "Deepak",
    "issue": "fever since morning",
    "category": "general",
    "response": "Take rest and drink fluids."
  }
}
```

### 2. Get All Submissions

- **URL:** `/api/users/all`
- **Method:** `GET`

### 3. Delete Submission

- **URL:** `/api/users/delete/:id`
- **Method:** `DELETE`

---

## Notes

- Validation checks ensure `name` and `issue` are required.
- Backend request logging is enabled for debugging.
- This project uses simple rule-based logic, not an external AI API.

---

## Future Improvements

- Add authentication for admin actions
- Add pagination for large data lists
- Add search and filter by category
- Add tests for API routes and frontend components

