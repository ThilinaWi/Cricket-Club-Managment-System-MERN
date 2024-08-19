const express = require("express");
const router = express.Router();
const CoachController = require("../controller/CoachController");

router.get("/coach", CoachController.getAllCoach);
router.post("/coach", CoachController.addCoach);
router.get("/coach/:id", CoachController.getCoachById);
router.put("/coach/:id", CoachController.updateCoach);
router.delete("/coach/:id", CoachController.deleteCoach);

module.exports = router;
