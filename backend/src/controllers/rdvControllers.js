// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const rdv = await tables.rdv.read(Number(sub));

    if (rdv === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(rdv);
    }
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
    const { title, date, startH, startM, endH, endM, description, contacts } =
      req.body;
    const { sub } = req.auth;

    const start = startH.concat(":", startM);
    const end = endH.concat(":", endM);

    const newRDV = await tables.rdv.create(
      title,
      date,
      start,
      end,
      description,
      Number(sub)
    );

    if (contacts !== "") {
      const rdvContact = await tables.rdv_contact.create(
        Number(newRDV),
        Number(contacts)
      );
      if (rdvContact === null) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    }

    if (newRDV === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "RDV ajouté à votre agenda" });
    }
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
