const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const upload = require("../Middleware/uploadMiddleware");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require("../Controllers/employeeController");

// CREATE
router.post("/", authMiddleware, upload.single("photo"), createEmployee);

// READ ALL + SEARCH + FILTER
router.get("/", authMiddleware, getEmployees);

// READ SINGLE
router.get("/:id", authMiddleware, getEmployeeById);

// UPDATE
router.put("/:id", authMiddleware, upload.single("photo"), updateEmployee);

// DELETE
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;