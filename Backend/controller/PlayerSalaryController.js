// const Employee = require("../Model/PlayerSalaryModel"); // Assuming the correct path and file name for the Employee model
const Employee = require("../models/PlayerSalaryModel")
const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addEmployee = async (req, res, next) => {
  try {
    // Check if the NIC already exists
    const existingEmployee = await Employee.findOne({ nic: req.body.nic });
    if (existingEmployee) {
      return res.status(400).json({ message: "NIC already registered" });
    }

    // If NIC doesn't exist, create a new employee
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const { name, nic, position, bank, account, salary,bonus,total } = req.body;

  try {
    let employee = await Employee.findByIdAndUpdate(id, {
      name: name,
      nic: nic,
      position: position,
      bank: bank,
      account: account,
      salary: salary,
      bonus: bonus,
      total: total,
    });
    
    if (!employee) {
      return res.status(404).json({ message: "Unable to Update employee Details" });
    }

    return res.status(200).json({ employee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ deletedEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
