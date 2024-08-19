const express = require('express');


const router = express.Router();
const { isAuthenticated,isAdmin } = require('../middleware/auth');
const { addPerformance, deletePerformanceRecord, editPerformanceRecord,
     singlePerformanceRecord, allPerformanceRecords, genaratePlayerPerformanceReport } = require('../controller/PerformanceController');


//user routes


// /api/admin/performance/create
router.post('/admin/performance/create', addPerformance);
// /api//performance/id
router.get('/performance/:id', singlePerformanceRecord);
// /api/admin/performance/update/_id
router.put('/admin/performance/update/:id',editPerformanceRecord);
// /api/performance
router.get('/performance',allPerformanceRecords);
// /api/admin/performance/delete/id
router.delete('/admin/performance/delete/:id',  deletePerformanceRecord);
// /api//admin/performance/report
router.get('/admin/performance/report',  genaratePlayerPerformanceReport);


module.exports = router;