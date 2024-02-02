const express = require("express");

const router = express.Router();

const { read, add, edit, editMdp } = require("../controllers/userControllers");
const { hash } = require("../middlewares/hash");
const { validateUser } = require("../middlewares/validateUser");
const { verifyToken } = require("../services/verifyToken");

// router.get("/", verifyToken, browse);

router.get("/", verifyToken, read);

router.post("/", validateUser, hash, add);

router.put("/", verifyToken, edit);
router.put("/mdp", verifyToken, hash, editMdp);

/* ************************************************************************* */

module.exports = router;
