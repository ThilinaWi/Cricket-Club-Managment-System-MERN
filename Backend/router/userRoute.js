const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser,deleteUser,practicesessionhistory,createUserEventsHistory } = require('../controller/userController');
const { isAuthenticated,isAdmin } = require('../middleware/auth');


// /api/allusers
router.get('/allusers',allUsers);
// /api/user/id
router.get('/user/:id', singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', editUser);
// /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', deleteUser);
// /api/user/jobhistory
router.post('/user/jobhistory', isAuthenticated,practicesessionhistory );  

// /api/user/eventhistory
router.post('/user/eventhistory', isAuthenticated, createUserEventsHistory);
module.exports = router;