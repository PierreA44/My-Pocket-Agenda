// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(Number(sub));

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const { pseudo, email } = req.body;

    const updatedUser = await tables.user.update(pseudo, email, Number(sub));

    if (updatedUser === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Profil mis à jour !" });
    }
  } catch (error) {
    next(error);
  }
};

const editMdp = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const { hashedPassword } = req.body;

    const updatedUser = await tables.user.updateMdp(
      hashedPassword,
      Number(sub)
    );

    if (updatedUser === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Mot-de-passe mis à jour !" });
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.user.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ id: insertId, message: "Nouveau compte créé" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  editMdp,
  add,
  // destroy,
};
