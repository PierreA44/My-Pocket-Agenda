// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    tables.rdv.read();
    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = { read, edit, add, destroy };
