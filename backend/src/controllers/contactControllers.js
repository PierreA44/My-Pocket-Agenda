// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const { sub } = req.auth;

    const contacts = await tables.contact.read(Number(sub));

    if (contacts === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

const readByContactID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await tables.contact.readByID(Number(id));

    if (contact === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const updatedContact = await tables.contact.update(name, email, Number(id));

    if (updatedContact === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Contact mis à jour" });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const { name, email } = req.body;

    const newContact = await tables.contact.create(name, email, Number(sub));

    if (newContact === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Contact ajouté à votre répertoire" });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteContact = await tables.contact.delete(Number(id));

    if (deleteContact === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Contact supprimé" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { read, readByContactID, edit, add, destroy };
