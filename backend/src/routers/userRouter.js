const express = require("express");

const router = express.Router();

const { browse, read, add } = require("../controllers/userControllers");
const { hash } = require("../middlewares/hash");
const { validateUser } = require("../middlewares/validateUser");

router.get("/", browse);

router.get("/:id", read);

router.post("/", validateUser, hash, add);

/* ************************************************************************* */

module.exports = router;
