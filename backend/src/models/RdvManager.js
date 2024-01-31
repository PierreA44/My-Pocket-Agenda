const AbstractManager = require("./AbstractManager");

class RdvManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "rdv" as configuration
    super({ table: "rdv" });
  }

  async create(title, date, start, end, description, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, scheduled_date, start_rdv, end_rdv, description, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, date, start, end, description, id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id=?`,
      [id]
    );
    return rows;
  }

  async update(id, note) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, scheduled_date=? WHERE id=?`,
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

module.exports = RdvManager;
