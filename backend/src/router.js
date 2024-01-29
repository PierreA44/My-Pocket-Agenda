const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

/* ************************************************************************* */

router.use("/user", userRouter);
router.use("/auth", authRouter);

/* ************************************************************************* */

module.exports = router;
