const router = require("express").Router();
const { getUsers, getUser, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", getUser);

module.exports = router;
