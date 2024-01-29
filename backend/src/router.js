const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
const userRouter = require("./routers/userRouter");

/* ************************************************************************* */

router.use("/user", userRouter);

/* ************************************************************************* */

module.exports = router;
