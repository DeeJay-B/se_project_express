const router = require("express").Router();

router.get("/", () => console.log("GET items"));
router.post("/", () => console.log("Post items"));
router.delete("/:itemId", () => console.log("deletes items by _id"));

module.exports = router;
