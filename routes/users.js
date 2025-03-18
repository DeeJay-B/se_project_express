const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth);
router.get("/me", auth, getCurrentUser);
router.get("/:userId", auth);
router.patch("/me", auth);
router.patch("/users/me", auth);

module.exports = router;
