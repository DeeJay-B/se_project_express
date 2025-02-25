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

router.like("/:itemId", likeItem);

router.dislike("/:itemId", dislikeItem);

module.exports = router;
