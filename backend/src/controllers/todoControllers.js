// Import access to database tables
const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const todos = await tables.todo.read(Number(sub));

    if (todos === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { note } = req.body;
    const { id } = req.params;

    const updatedTodo = await tables.todo.update(Number(id), note);

    if (updatedTodo === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Note modifiée" });
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { sub } = req.auth;
    const { note } = req.body;
    const todo = await tables.todo.create(note, Number(sub));

    if (todo === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Nouvelle note ajoutée" });
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteTodo = await tables.todo.delete(Number(id));

    if (deleteTodo === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ message: "Note supprimée" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { read, edit, add, destroy };
