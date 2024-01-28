const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
const itemRouter = require("./routers/itemRouter");

/* ************************************************************************* */

router.use("/item", itemRouter);

/* ************************************************************************* */

module.exports = router;
