const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const todoRouter = require("./routers/todoRouter");
const contactRouter = require("./routers/contactRouter");
const rdvRouter = require("./routers/rdvRouter");
const { verifyToken } = require("./services/verifyToken");

/* ************************************************************************* */

router.use("/user", userRouter);
router.use("/auth", authRouter);

router.use(verifyToken);

router.use("/todo", todoRouter);
router.use("/contact", contactRouter);
router.use("/rdv", rdvRouter);

/* ************************************************************************* */

module.exports = router;
