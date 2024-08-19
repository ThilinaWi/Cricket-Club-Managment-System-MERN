const express = require('express');
const router = express.Router();
const { createEventType, allEventsType,updateEventType,deleteEventType} = require('../controller/eventsTypeController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//event type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createEventType)

// /api/type/events
router.get('/type/events', allEventsType) 
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateEventType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteEventType)








module.exports = router;