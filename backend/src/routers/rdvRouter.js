const express = require("express");

const router = express.Router();

const {
  read,
  readByRDVId,
  add,
  edit,
  destroy,
} = require("../controllers/rdvControllers");
// const { validateRdv } = require("../middlewares/validateRDV");

router.get("/", read);

router.post("/", add);

router.get("/:id", readByRDVId);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
