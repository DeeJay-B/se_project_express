const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
  CREATED,
  FORBIDDEN,
} = require("../utils/errors");

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      if (err.name === "NOT_FOUND") {
        return res.status(NOT_FOUND).send({ message: "Document Not Found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from  createItem" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: "Error from getItems" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res.status(FORBIDDEN).send({ message: "Forbidden" });
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(SUCCESS).send({ message: "Successfully deleted" })
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Bad Request" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Document Not Found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from deleteItem" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Bad Request" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Document Not Found" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error from likeItem" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(CREATED).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send("Document Not Found");
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from dislikeItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
