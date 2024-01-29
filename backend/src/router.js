const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const todoRouter = require("./routers/todoRouter");

/* ************************************************************************* */

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/todo", todoRouter);

/* ************************************************************************* */

module.exports = router;
