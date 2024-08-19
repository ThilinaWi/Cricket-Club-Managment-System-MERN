const practiceSessType = require('../models/practiceSessionType');
const ErrorResponce = require('../utils/errorResponse');

// create practice session category
exports.createPracticeSessionType = async (req, res, next) => {

    const { practiceSessionTypeName } = req.body;
    const SessonExist = await practiceSessType.findOne({ practiceSessionTypeName });
    if (SessonExist) {
        return next(new ErrorResponce("Session already registred", 400));
    }

    try {
        const sessionT = await practiceSessType.create({
            practiceSessionTypeName: req.body.practiceSessionTypeName,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            sessionT
        });
    } catch (error) {
        next(error);
    }
};

// all practice session category
exports.allPracticeSessionType = async (req, res, next) => {

    try {
        const sessionT = await practiceSessType.find();
        res.status(200).json({
            success: true,
            sessionT
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePracticeSessionType = async (req, res, next) => {

    try {
        const sessionT = await practiceSessType.findByIdAndUpdate(req.params.type_id,req.body,{new:true});

        res.status(200).json({
            success: true,
            sessionT
        });
    } catch (error) {
        next(error);
    }
};

exports.DeletePracticeSessionType = async (req, res, next) => {

    try {
        const sessionT = await practiceSessType.findByIdAndDelete(req.params.type_id);

        res.status(200).json({
            success: true,
            message: "Practice Session Type is Deleted"
        });
    } catch (error) {
        next(error);
    }
};
