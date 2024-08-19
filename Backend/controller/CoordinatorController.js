const Coordinator = require("../models/CoordinatorModel");

const getAllCoordinator = async (req, res, next) => {
  let coordi;
  // Get all Coordinator
  try {
    coordi = await Coordinator.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!coordi) {
    return res.status(404).json({ message: "Coordinator not found" });
  }
  // Display all coordi
  return res.status(200).json({ coordi });
};

// data Insert
const addCoordinator = async (req, res, next) => {
  const { name, gmail, phone, provinces,city,date,time } = req.body;

  let coordi;

  try {
    coordi = new Coordinator({ name, gmail, phone, provinces,city,date,time });
    await coordi.save();
  } catch (err) {
    console.log(err);
  }
  // not insert coordis
  if (!coordi) {
    return res.status(404).json({ message: "unable to add Coordinator" });
  }
  return res.status(200).json({ coordi });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let coordi;

  try {
    coordi = await Coordinator.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available coordis
  if (!coordi) {
    return res.status(404).json({ message: "Coordinator Not Found" });
  }
  return res.status(200).json({ coordi });
};

//Update coordi Details
const updateCoordinator = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, phone, provinces,city,date,time } = req.body;

  let coordis;

  try {
    coordis = await Coordinator.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      phone: phone,
      provinces: provinces,
      city: city,
      date:date,
      time: time
    });
    coordis = await coordis.save();
  } catch (err) {
    console.log(err);
  }
  if (!coordis) {
    return res.status(404).json({ message: "Unable to Update Coordinator Details" });
  }
  return res.status(200).json({ coordis });
};

//Delete coordi Details
const deleteCoordinator = async (req, res, next) => {
  const id = req.params.id;

  let coordi;

  try{
    coordi= await Coordinator.findByIdAndDelete(id)
  }catch (err) {
    console.log(err);
  }
  if (!coordi) {
    return res.status(404).json({ message: "Unable to Delete Coordinator Details" });
  }
  return res.status(200).json({ coordi });

};

exports.getAllCoordinator = getAllCoordinator;
exports.addCoordinator = addCoordinator;
exports.getById = getById;
exports.updateCoordinator = updateCoordinator;
exports.deleteCoordinator = deleteCoordinator;
