const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(201).send({ data: item });
    })
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
    .then(() => res.status(200).send({}))
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

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(itemId, { $inc: { likes: 1 } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send("Invalid ID");
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send("Document Not Found");
      }
      return res.status(500).send({ message: "Error from likeItem", err });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(itemId, { $inc: { dislikes: 1 } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send("Invalid ID");
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send("Document Not Found");
      }
      return res.status(500).send({ message: "Error from dislikeItem", err });
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
