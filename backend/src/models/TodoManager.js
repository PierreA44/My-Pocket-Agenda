const AbstractManager = require("./AbstractManager");

class TodoManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "todo" as configuration
    super({ table: "todo" });
  }

  async create(note, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (note, user_id) VALUES (?, ?)`,
      [note, id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT id, note, creation_date FROM ${this.table} WHERE user_id=? ORDER BY creation_date DESC`,
      [id]
    );
    return rows;
  }

  async readByID(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows[0];
  }

  async update(id, note) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET note=? WHERE id=?`,
      [note, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = TodoManager;
