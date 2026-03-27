# Healthcare Support App

A simple full-stack web application that allows users to submit health-related issues and receive automated responses using a rule-based AI system.

---

## 🚀 Features

- Submit health issues through a form
- Automated response generation (rule-based AI)
- Data stored in MongoDB
- View all submitted data (GET API)
- Delete entries (DELETE API)
- Clean and simple UI

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Axios
- CSS

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🤖 AI Logic (Rule-Based)

The system analyzes user input and generates responses:

- "fever" → Take rest and drink fluids
- "pain" → Stay hydrated and rest
- "emergency" → Call emergency helpline
- Others → Our team will contact you soon

---

## 📡 API Endpoints

### POST