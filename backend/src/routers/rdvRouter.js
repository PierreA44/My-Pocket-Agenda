const express = require("express");

const router = express.Router();

const {
  read,
  readByRDVId,
  add,
  edit,
  destroy,
} = require("../controllers/rdvControllers");
const { parseTimerNEW, parseTimerEDIT } = require("../services/parseTimer");
const { validateRdv } = require("../middlewares/validateRDV");

router.get("/", read);

router.post("/", parseTimerNEW, validateRdv, add);

router.get("/:id", readByRDVId);

router.put("/:id", parseTimerEDIT, validateRdv, edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
