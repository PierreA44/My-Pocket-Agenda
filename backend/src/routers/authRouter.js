const express = require("express");

const router = express.Router();

const { add } = require("../controllers/authControllers");
const { validatePassword } = require("../middlewares/hash");

router.post("/", validatePassword, add);

/* ************************************************************************* */

module.exports = router;
