const express = require("express");

const router = express.Router();

const {
  read,
  readByContactID,
  add,
  edit,
  destroy,
} = require("../controllers/contactControllers");

router.get("/", read);

router.post("/", add);

router.get("/:id", readByContactID);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
