const Event= require('../models/eventModel');
const EventType = require('../models/eventTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create event
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
           
            location: req.body.location,
            eventType: req.body.eventType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            event
        })
    } catch (error) {
        next(error);
    }
}

//single event
exports.singleEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json({
            success: true,
            event
        })
    } catch (error) {
        next(error);
    }
}


//update event by id.
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.event_id, req.body, { new: true }).populate('eventType', 'eventTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            event
        })
    } catch (error) {
        next(error);
    }
}

//delete event by id.
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.event_id);
        res.status(200).json({
            success: true,
            message: "event deleted."
        })
    } catch (error) {
        next(error);
    }
}
//show event by id.
exports.showEvents = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter events by category ids
    let ids = [];
    const eventTypeCategory = await EventType.find({}, { _id: 1 });
    eventTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;

    //events by location
    let locations = [];
    const eventByLocation = await Event.find({}, { location: 1 });
    eventByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;
    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Event.find({}).estimatedDocumentCount();
    const count = await Event.find({ ...keyword, eventType: categ , location: locationFilter }).countDocuments();

    try {
        const events = await Event.find({ ...keyword, eventType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('eventType', 'eventTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            events,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        })
    } catch (error) {
        next(error);
    }
}

/*
//delete job by id.
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.job_id);
        res.status(200).json({
            success: true,
            message: "event deleted."
        })
    } catch (error) {
        next(error);
    }
}

/*
//update job by id.
exports.showEvent = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter jobs by category ids
    let ids = [];
    const eventTypeCategory = await EventType.find({}, { _id: 1 });
    eventTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //jobs by location
    let locations = [];
    const eventByLocation = await Event.find({}, { location: 1 });
    eventByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword, eventType: categ, location: locationFilter }).countDocuments();

    try {
        const events = await Event.find({ ...keyword, eventType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('eventType', 'eventTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            events,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation

        })
    } catch (error) {
        next(error);
    }
}*/
