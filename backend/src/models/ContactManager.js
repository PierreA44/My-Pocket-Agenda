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

  async update(name, email, phone, id) {
    const sql = `UPDATE ${this.table} SET `;

    const sqlParams = [];

    const sqlClause = {};

    if (name !== "") {
      sqlClause.name = "name = ?";
      sqlParams.push(name);
    }

    if (email !== "") {
      sqlClause.email = "email = ?";
      sqlParams.push(email);
    }

    if (phone !== "") {
      sqlClause.phone = "phone_number = ?";
      sqlParams.push(phone);
    }

    sqlParams.push(id);

    const [result] = await this.database.query(
      `${sql} ${Object.values(sqlClause).join()} WHERE id = ?`,
      sqlParams
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
