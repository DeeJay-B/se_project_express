const router = require("express").Router();

const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

// router.put("/:itemId", updateItem);

router.delete("/:itemId", deleteItem);

router.patch("/:itemId", likeItem);

router.delete("/:itemId", dislikeItem);

module.exports = router;
