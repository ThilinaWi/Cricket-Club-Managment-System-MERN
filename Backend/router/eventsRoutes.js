const express = require('express');
const router = express.Router();
const { createEvent,singleEvent,updateEvent,showEvents,deleteEvent} = require('../controller/eventsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//event routes

// /api/event/create
router.post('/event/create', isAuthenticated, isAdmin, createEvent);
// /api/event/id
router.get('/event/:id', singleEvent);
// /api/event/update/job_id
router.put('/event/update/:event_id', isAuthenticated, isAdmin, updateEvent);
// /api/events/show
router.get('/events/show', showEvents);
// /api/event/delete/job_id
router.delete('/event/delete/:event_id', isAuthenticated, isAdmin, deleteEvent);


module.exports = router;