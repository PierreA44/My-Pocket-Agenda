const AbstractManager = require("./AbstractManager");

class RdvManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "rdv" as configuration
    super({ table: "rdv" });
  }

  async create(title, date, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, scheduled_date, user_id) VALUES (?, ?, ?)`,
      [title, date, id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT rdv.id, rdv.title, rdv.scheduled_date, rdv.description, GROUP_CONCAT(c.name) AS contacts FROM ${this.table}
       JOIN rdv_contact AS rc ON rc.rdv_id=rdv.id JOIN contact AS c ON c.id=rc.contact_id WHERE user_id=?`,
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
