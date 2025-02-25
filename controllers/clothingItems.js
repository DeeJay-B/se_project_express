const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send("Invalid ID");
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send("Document Not Found");
      }
      return res.status(500).send({ message: "Error from  createItem", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send("Invalid ID");
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send("Document Not Found");
      }
      return res.status(500).send({ message: "Error from updateItem", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send("Invalid ID");
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send("Document Not Found");
      }
      return res.status(500).send({ message: "Error from deleteItem", err });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
