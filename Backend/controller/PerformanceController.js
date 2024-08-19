const Performance= require('../models/PerformanceModel');

const ErrorResponse = require('../utils/errorResponse');





//create Performance
exports.addPerformance = async (req, res) => {
    try {
        const {
            PlayerId, LastName, Inits, MainRole, Matches, Inns, No, Runs, HS, Ave, SR, Hundreds, Fifties, Sixes, Fours, Wickets,Overs,RunsInB,MainOvers,BAvg,Econ,BowlingSR,BBI,BBM
            ,Ct,Runouts, St
        } = req.body;

        // Create a new player performance record
        const performance = new Performance({
            PlayerId, LastName, Inits, MainRole, Matches, Inns, No, Runs, HS, Ave, SR, Hundreds, Fifties, Sixes, Fours,Wickets,Overs,RunsInB,MainOvers,BAvg,Econ,BowlingSR,BBI,BBM
            ,Ct,Runouts, St
        });

        
        await performance.save(); // Save the performance record to the database

        res.status(201).json({
            success: true,
            data: performance
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
};


//single Performance
exports.singlePerformanceRecord = async (req, res, next) => {
    try {
        const playerP = await Performance.findById(req.params.id);
        res.status(200).json({
            success: true,
            playerP
        })
    } catch (error) {
        next(error);
    }
}


//update Performance by id.
exports.editPerformanceRecord = async (req, res, next) => {
    try {
        const playerP = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            playerP
        })
        next();
    } catch (error) {
        next(error);
    }
}

//delete PRecord
exports.deletePerformanceRecord = async (req, res, next) => {
    try {
        const playerP = await Performance.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Batting P Record is deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//all Performance 
exports.allPerformanceRecords = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        LastName: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    let MainRoles = [];
    const PerformanceByMainRole = await Performance.find({}, { MainRole: 1 });
    PerformanceByMainRole.forEach(val => {
        MainRoles.push(val.MainRole);
    });
    let setUniqueMainRoles = [...new Set(MainRoles)];
    let MainRole = req.query.MainRole;
    let MainRoleFilter = MainRole !== '' ? MainRole : setUniqueMainRoles;


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Performance.find({ ...keyword ,MainRole: MainRoleFilter}).countDocuments();

    try {
        const playerPs = await Performance.find({ ...keyword ,MainRole: MainRoleFilter }).sort({ createdAt: -1 }).skip(pageSize * (page - 1)).limit(pageSize)

        res.status(200).json({
            success: true,
            playerPs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueMainRoles

        })
    } catch (error) {
        next(error);
    }
}


//report csv
exports.genaratePlayerPerformanceReport = async (req, res) => {
    try {
      const playerP = await Performance.find({});
      res.json(playerP);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
