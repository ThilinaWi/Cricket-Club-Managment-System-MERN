// const GetItem = require("../Model/GetItemModel");
const GetItem = require("../models/GetItemModel");

const addGetItem = async (req, res, next) => {
  try {
    const newGetItem = new GetItem(req.body);
    await newGetItem.save();
    res.status(201).json({ newGetItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllGetItems = async (req, res, next) => {
  try {
    const Getitems = await GetItem.find();
    res.status(200).json({ Getitems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  addGetItem,
  getAllGetItems,
};
