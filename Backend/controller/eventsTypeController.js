const EventType = require('../models/eventTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create event category
exports.createEventType = async (req, res, next) => {
    try {
        const eventT = await EventType.create({
            eventTypeName: req.body.eventTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            eventT
        })
    } catch (error) {
        next(error);
    }
}
//all event category
exports.allEventsType = async (req, res, next) => {
    try {
        const eventT = await EventType.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            eventT
        })
    } catch (error) {
        next(error);
    }
}
//update event type
exports.updateEventType = async (req, res, next) => {
    try {
        const eventT = await EventType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            eventT
        })
    } catch (error) {
        next(error);
    }
}

//delete event type
exports.deleteEventType = async (req, res, next) => {
    try {
        const eventT = await EventType.findByIdAndDelete(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Event Type deleted",
            
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}