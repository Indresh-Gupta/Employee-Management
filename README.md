# Employee Management System - Frontend

This is the frontend of the Employee Management System built using React.js.  
It allows users to manage employees with features like create, update, delete, and search.

---

##  Tech Stack

- React.js
- Axios
- Context API
- CSS
- React Hooks

---

##  Folder Structure

frontend/
 ├── src/
 │   ├── api/
 │   │    axios.js
 │   ├── components/
 │   │    Header.js
 │   │    EmployeeTable.js
 │   │    EmployeeModal.js
 │   ├── pages/
 │   │    Login.js
 │   │    Dashboard.js
 │   ├── context/
 │   │    AuthContext.js
 │   ├── App.js
 │   └── index.js

---

##  Installation

1. Go to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

The app will run on:
http://localhost:3000

---

##  API Configuration

Make sure the base URL inside src/api/axios.js is:

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

---

##  Features

- Create Employee
- Update Employee
- Delete Employee
- Search Employee
- Upload Employee Photo
- Responsive Design
- Three-dot action dropdown
- Modal-based form

---

## Responsive Design

Works on:
- Desktop
- Tablet
- Mobile devices

---






# Employee Management System - Backend

This is the backend API for the Employee Management System built using Node.js, Express, and MongoDB.

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (File Upload)
- CORS
- dotenv

---

##  Folder Structure

backend/
 ├── Controllers/
 │    employeeController.js
 ├── Models/
 │    Employee.js
 ├── Routes/
 │    employeeRoutes.js
 ├── uploads/
 ├── server.js
 ├── package.json

---

##  Installation

1. Go to backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file in root folder:

   PORT=8080
   MONGO_URI=your_mongodb_connection_string

4. Start the server:
   npm start

Server will run on:
http://localhost:8080

---

## Employee Schema

fullName: { type: String, required: true }
email: { type: String, required: true }
phone: { type: String, required: true }
gender: { type: String }
dob: { type: Date }
department: { type: String }
designation: { type: String }
photo: { type: String }

---

##  API Endpoints

Create Employee
POST /api/employees

Get All Employees
GET /api/employees

Update Employee
PUT /api/employees/:id

Delete Employee
DELETE /api/employees/:id

---

## File Upload

Employee photos are stored in:
backend/uploads

Make sure uploads folder exists.

Static middleware in server.js:

app.use("/uploads", express.static("uploads"));

---

##  CORS Setup

const cors = require("cors");
app.use(cors());

---


