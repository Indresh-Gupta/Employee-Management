
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();


const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://employee-managementfrontend.onrender.com/", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

// Serve uploaded image

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/employees", require("./Routes/employeeRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });

//   app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });