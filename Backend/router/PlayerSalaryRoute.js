const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/PlayerSalaryController");

router.get("/player", EmployeeController.getAllEmployees);
router.post("/player", EmployeeController.addEmployee);
router.get("/player/:id", EmployeeController.getEmployeeById);
router.put("/player/:id", EmployeeController.updateEmployee);
router.delete("/player/:id", EmployeeController.deleteEmployee);

module.exports = router;
