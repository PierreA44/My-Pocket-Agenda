const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "contact" as configuration
    super({ table: "contact" });
  }

  async create(name, email, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, user_id) VALUES (?, ?, ?)`,
      [name, email, id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id=? ORDER BY name ASC`,
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

  async update(name, email, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, email=? WHERE id=?`,
      [name, email, id]
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

module.exports = ContactManager;
