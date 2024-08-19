// const Coach = require("../Model/CoachSalaryModel"); // Assuming the correct path and file name for the Employee model
const Coach = require("../models/CoachSalaryModel")
const getAllCoach = async (req, res, next) => {
  try {
    const coach = await Coach.find();
    res.status(200).json({ coach });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCoach = async (req, res, next) => {
  try {
    // Check if the NIC already exists
    const existingCoach = await Coach.findOne({ nic: req.body.nic });
    if (existingCoach) {
      return res.status(400).json({ message: "NIC already registered" });
    }

    // If NIC doesn't exist, create a new Coach
    const newCoach = new Coach(req.body);
    await newCoach.save();
    res.status(201).json({ newCoach });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCoachById = async (req, res, next) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "coach not found" });
    }
    res.status(200).json({ coach });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCoach = async (req, res, next) => {
  const id = req.params.id;
  const { name, nic, position, bank, account, salary, bonus, total } = req.body;

  try {
    let coach = await Coach.findByIdAndUpdate(id, {
      name: name,
      nic: nic,
      position: position,
      bank: bank,
      account: account,
      salary: salary,
      bonus: bonus,
      total: total,
    });

    if (!coach) {
      return res
        .status(404)
        .json({ message: "Unable to Update employee Details" });
    }

    return res.status(200).json({ coach });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCoach = async (req, res, next) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
    if (!deletedCoach) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ deletedCoach });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCoach,
  addCoach,
  getCoachById,
  updateCoach,
  deleteCoach,
};
