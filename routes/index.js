const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/config");

const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Not found" });
});

module.exports = router;
