const express = require("express");
const router = express.Router();
//Insert Model
const Coordinator = require("../models/CoordinatorModel");

//Insert User Controller
const CoordinatorController = require("../controller/CoordinatorController");

router.get("/coor", CoordinatorController.getAllCoordinator);
router.post("/coor", CoordinatorController.addCoordinator);
router.get("/coor/:id", CoordinatorController.getById);
router.put("/coor/:id", CoordinatorController.updateCoordinator);
router.delete("/coor/:id", CoordinatorController.deleteCoordinator);

//export
module.exports = router;
