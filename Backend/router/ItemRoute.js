const express = require("express");
const item_router = express.Router();
// const ItemController = require("../Controllers/ItemController");
const ItemController = require("../controller/ItemController");

item_router.get("/items", ItemController.getAllItems);
item_router.post("/items", ItemController.addItem);
item_router.get("/items/:id", ItemController.getItemById);
item_router.put("/items/:id", ItemController.updateItem);
item_router.delete("/items/:id", ItemController.deleteItem);

module.exports = item_router;
