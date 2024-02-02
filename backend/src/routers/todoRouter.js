const express = require("express");

const router = express.Router();

const {
  read,
  readByTodoID,
  add,
  edit,
  destroy,
} = require("../controllers/todoControllers");

router.get("/", read);

router.post("/", add);

router.get("/:id", readByTodoID);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
