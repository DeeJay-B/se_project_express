const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  login,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", getUser);
router.post("/", createUser);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
