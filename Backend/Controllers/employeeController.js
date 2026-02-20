const Employee = require("../Models/Employee");

// CREATE
exports.createEmployee = async (req, res) => {
  try {
     console.log("Create Employee Body:", req.body);
    const employee = await Employee.create({
      ...req.body,
      photo: req.file ? req.file.filename : null
    });
    console.log("Employee Created:", employee);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL + SEARCH + FILTER
exports.getEmployees = async (req, res) => {
  const { search, department, designation, gender } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  if (department) query.department = department;
  if (designation) query.designation = designation;
  if (gender) query.gender = gender;

  const employees = await Employee.find(query);
  res.json(employees);
};

// GET BY ID
exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  const updateData = {
    ...req.body
  };

  if (req.file) {
    updateData.photo = req.file.filename;
  }

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(employee);
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};