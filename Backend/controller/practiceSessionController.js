const practiceSess = require('../models/practiceSessionModel');
const practiceSessType = require('../models/practiceSessionType')
const user = require('../models/userModel')
const ErrorResponce = require('../utils/errorResponse');

// create practice session 
exports.createPracticeSession = async (req, res, next) => {

    try {
        const praticeSession = await practiceSess.create({
            practiceSessionName: req.body.practiceSessionName,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            practiceSessionType: req.body.practiceSessionType,
            //user: req.user.id
            
        });

        res.status(201).json({
            success: true,
            praticeSession
        });
    } catch (error) {
        next(error);
    }
};

// show single practice session 
exports.singlepracticeSession = async (req, res, next) => {

    try {
        const session = await practiceSess.findById(req.params.id);
        res.status(200).json({
            success:true,
            session
        })
    } catch (error) {
        next(error);
    }
};

// Update practice session 
exports.updatepracticeSession = async (req, res, next) => {

    try {
        const session = await practiceSess.findByIdAndUpdate(req.params.practiceSess_id,req.body, {new: true}).populate('user','firstName lastName ');
        res.status(200).json({
            success:true,
            session
        })
    } catch (error) {
        next(error);
    }
};

//show all practice session 
exports.showAllPracticeSessions = async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    let keywordFilter = {};
    let dateFilter = {};
    let locationFilter = {};
    let categoryFilter = {};

    // Search by session name
    if (req.query.keyword) {
        keywordFilter = {
            practiceSessionName: {
                $regex: new RegExp(req.query.keyword, 'i')
            }
        };
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
        dateFilter = {
            date: {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            }
        };
    }

    // Filter by category ID
    const cat = req.query.cat;
    if (cat) {
        // Assuming cat is a comma-separated string of category IDs, split it into an array
        const categoryIds = cat.split(',');

        // Apply the category filter using $in operator
        categoryFilter = { practiceSessionType: { $in: categoryIds } };
    }

    try {
        // Count total sessions matching filters
        const count = await practiceSess.countDocuments({
            ...keywordFilter,
            ...dateFilter,
            ...locationFilter,
            ...categoryFilter
        });

        // Fetch sessions for the current page
        const sessions = await practiceSess.find({
            ...keywordFilter,
            ...dateFilter,
            ...locationFilter,
            ...categoryFilter
        })
        .skip(pageSize * (page - 1)).sort({createdAt:-1}).populate('user','firstName')
        .limit(pageSize);

        res.status(200).json({
            success: true,
            sessions,
            page,
            pages: Math.ceil(count / pageSize),
            count,
        });
    } catch (error) {
        next(error);
    }
};

// Delete practice session
exports.deletePracticeSession = async (req, res, next) => {
    try {
        const session = await practiceSess.findByIdAndDelete(req.params.practiceSess_id);
        if (!session) {
            return next(new ErrorResponce(`Practice session not found with id of ${req.params.practiceSess_id}`, 404));
        }
        res.status(200).json({
            success: true,
            message: 'Practice session deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};









