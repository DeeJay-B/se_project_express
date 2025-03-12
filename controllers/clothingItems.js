const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
  CREATED,
} = require("../utils/config");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

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
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ messgae: "Document Not Found" });
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

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return res.status(400).send("Invalid ID");
//       }
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(404).send("Document Not Found");
//       }
//       return res.status(500).send({ message: "Error from updateItem", err });
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(SUCCESS).send({ message: "Item deleted" }))
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
        return res.status(BAD_REQUEST).send("Invalid ID");
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
