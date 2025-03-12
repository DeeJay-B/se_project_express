const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/config");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Not found" });
});

module.exports = router;
