const express = require('express');
const router = express.Router();

const {createPracticeSessionType , allPracticeSessionType,updatePracticeSessionType,DeletePracticeSessionType } = require("../controller/practiceSessionTypeController")
const { isAuthenticated,isAdmin } = require('../middleware/auth');

// /api/CreatePracticeSessionType
router.post('/psessionType/create', isAuthenticated , isAdmin, createPracticeSessionType);
router.get('/psessionType/alljobtype', allPracticeSessionType);
router.put('/psessionType/update/:type_id', isAuthenticated,isAdmin,updatePracticeSessionType);
router.delete('/psessionType/delete/:type_id', isAuthenticated,isAdmin,DeletePracticeSessionType);

module.exports = router;