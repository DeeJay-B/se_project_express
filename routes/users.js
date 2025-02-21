const router = require("express").Router();

router.get("/users", () => console.log("GET users"));
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", () => console.log("Post users"));

module.exports = router;
