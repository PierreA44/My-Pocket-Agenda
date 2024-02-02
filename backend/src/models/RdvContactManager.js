const AbstractManager = require("./AbstractManager");

class RdvContactManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "contact" as configuration
    super({ table: "rdv_contact" });
  }

  async create(rdvID, contactID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (rdv_id, contact_id) VALUES (?, ?)`,
      [rdvID, contactID]
    );
    return result.insertId;
  }

  async readByRdvID(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE rdv_id = ?`,
      [id]
    );
    return rows;
  }

  async readByUserID(id) {
    const [rows] = await this.database.query(
      `SELECT rc.id, rc.rdv_id, c.id AS contact_id, c.name AS contacts, email FROM ${this.table} AS rc
       JOIN contact AS c ON c.id = rc.contact_id JOIN rdv ON rdv.id = rc.rdv_id WHERE rdv.user_id=?`,
      [id]
    );
    return rows;
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
      `DELETE FROM ${this.table} WHERE rdv_id=?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = RdvContactManager;
