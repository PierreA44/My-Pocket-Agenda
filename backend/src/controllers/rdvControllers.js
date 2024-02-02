// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const rdv = await tables.rdv.read(Number(sub));
    const contactsRdv = await tables.rdv_contact.readByUserID(Number(sub));

    // if(contactsRdv === null)

    if (rdv === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ RDV: rdv, ContactsRdv: contactsRdv });
    }
  } catch (error) {
    next(error);
  }
};

const readByRDVId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rdv = await tables.rdv.readByID(Number(id));

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
    const { id } = req.params;
    const { title, date, selectedContact, start, end, description } = req.body;

    const updatedRDV = await tables.rdv.update(
      title,
      date,
      start,
      end,
      description,
      Number(id)
    );
    if (selectedContact[0]) {
      selectedContact.forEach(async (c) => {
        const rdvContact = await tables.rdv_contact.update(
          Number(id),
          Number(c)
        );
        if (rdvContact === null) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      });
    }

    if (updatedRDV === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "RDV modifié" });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { title, date, description, selectedContact, start, end } = req.body;
    const { sub } = req.auth;

    const newRDV = await tables.rdv.create(
      title,
      date,
      start,
      end,
      description,
      Number(sub)
    );
    let rdvContact = "toto";
    if (selectedContact[0]) {
      selectedContact.forEach(async (c) => {
        rdvContact = await tables.rdv_contact.create(Number(newRDV), Number(c));
      });
    }

    if (newRDV === null || rdvContact === null) {
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
    const { id } = req.params;

    const isContact = await tables.rdv_contact.readByRdvID(Number(id));

    if (isContact !== null) {
      await tables.rdv_contact.delete(Number(id));
    }

    const deletedRdv = await tables.rdv.delete(Number(id));

    if (deletedRdv === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "RDV supprimé" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { read, readByRDVId, edit, add, destroy };
