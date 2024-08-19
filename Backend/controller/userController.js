const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.allUsers = async (req, res, next) => {
    //pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;


    //enable search
    const keyword = req.query.keyword ? {
        firstName: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //battingStyle
    let battingStyle = [];
    const userBybattingStyle = await User.find({}, { battingStyle: 1, _id: 0 });
    userBybattingStyle.forEach(user => {
        battingStyle.push(user.battingStyle);
    });
    let uniqueBattingStyle = [...new Set(battingStyle)];
    let batStyle = req.query.battingStyle;
    let styleBatFilter = batStyle !=='' ? batStyle : uniqueBattingStyle;


    //bowlingStyle
    let bowlingStyle = [];
    const userBybowlingStyle = await User.find({}, { bowlingStyle: 1, _id: 0 });
    userBybowlingStyle.forEach(user => {
        bowlingStyle.push(user.bowlingStyle);
    });
    let uniqueBowlingStyle = [...new Set(bowlingStyle)];
    let bawlstyle = req.query.bowlingStyle;
    let styleBallFilter = bawlstyle !=='' ? bawlstyle : uniqueBowlingStyle;




    const count = await User.find({ ...keyword,battingStyle:styleBatFilter, bowlingStyle:styleBallFilter }).countDocuments();
    try {

        const users = await User.find({ ...keyword,battingStyle:styleBatFilter, bowlingStyle:styleBallFilter }).limit(pageSize).skip(pageSize * (page - 1));

        res.status(200).json({
            success: true,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            users,
            uniqueBattingStyle,
            uniqueBowlingStyle
        });
    } catch (error) {
        next(error);
    }
};

exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'User deleted'
        });
    } catch (error) {
        next(error);
    }
};

exports.practicesessionhistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse('You must log in', 401));
        }
        currentUser.jobsHistory.push({ title, description, salary, location });
        await currentUser.save();
        res.status(200).json({
            success: true,
            currentUser
        });
    } catch (error) {
        next(error);
    }
};
exports.createUserEventsHistory = async (req, res, next) => {
    const { title, description, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            const addEventHistory = {
                title,
                description,
                location,
                user: req.user._id
            }
            currentUser.eventsHistory.push(addEventHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}