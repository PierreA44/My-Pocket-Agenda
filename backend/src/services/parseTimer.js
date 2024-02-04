const moment = require("moment");
const tables = require("../tables");

const parseTimerNEW = async (req, res, next) => {
  try {
    const { date, start, end } = req.body;

    const startRDV = `${date} ${start}:00`;
    const endRDV = `${date} ${end}:00`;

    req.body.startRdv = startRDV;
    req.body.endRdv = endRDV;
    next();
  } catch (error) {
    next(error);
  }
};

const parseTimerEDIT = async (req, res, next) => {
  try {
    const { date, start, end } = req.body;
    const { id } = req.params;

    if (date === "" && start === "" && end === "") {
      req.body.startRdv = "";
      req.body.endRdv = "";
      next();
    }
    const editRdv = await tables.rdv.readByID(Number(id));
    const dateBase = moment(editRdv.end_rdv).format("YYYY-MM-DD");
    const startBase = moment(editRdv.start_rdv).format("LT");
    const endBase = moment(editRdv.end_rdv).format("LT");

    if (date === "" && start === "" && end !== "") {
      req.body.startRdv = `${dateBase} ${startBase}:00`;
      req.body.endRdv = `${dateBase} ${end}:00`;
      next();
    }
    if (date === "" && start !== "" && end === "") {
      req.body.startRdv = `${dateBase} ${start}:00`;
      req.body.endRdv = `${dateBase} ${endBase}:00`;
      next();
    }
    if (date !== "" && start === "" && end === "") {
      req.body.startRdv = `${date} ${startBase}:00`;
      req.body.endRdv = `${date} ${endBase}:00`;
      next();
    }
    if (date !== "" && start !== "" && end === "") {
      req.body.startRdv = `${date} ${end}:00`;
      req.body.endRdv = `${date} ${endBase}:00`;
      next();
    }
    if (date !== "" && start === "" && end !== "") {
      req.body.startRdv = `${date} ${startBase}:00`;
      req.body.endRdv = `${date} ${end}:00`;
      next();
    }
    if (date === "" && start !== "" && end !== "") {
      req.body.startRdv = `${dateBase} ${start}:00`;
      req.body.endRdv = `${dateBase} ${end}:00`;
      next();
    }
    if (date !== "" && start !== "" && end !== "") {
      req.body.startRdv = `${date} ${start}:00`;
      req.body.endRdv = `${date} ${end}:00`;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { parseTimerNEW, parseTimerEDIT };
