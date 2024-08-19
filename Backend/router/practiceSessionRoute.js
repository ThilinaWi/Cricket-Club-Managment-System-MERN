const express = require('express');
const router = express.Router();

const {createPracticeSession,singlepracticeSession, showAllPracticeSessions , updatepracticeSession, deletePracticeSession } = require("../controller/practiceSessionController")
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// /api/CreatePracticeSessionType
router.post('/practicesession/create',createPracticeSession); //isAuthenticated , isAdmin,
router.get('/practicesession/:id', singlepracticeSession);
router.put('/practicesession/update/:practiceSess_id',updatepracticeSession);
router.get('/practicesessions/show',showAllPracticeSessions);
router.delete('/practicesessions/delete/:practiceSess_id',deletePracticeSession);

module.exports = router;