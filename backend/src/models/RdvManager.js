const AbstractManager = require("./AbstractManager");

class RdvManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "rdv" as configuration
    super({ table: "rdv" });
  }

  async create(title, start, end, description, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, start_rdv, end_rdv, description, user_id) VALUES (?, ?, ?, ?, ?)`,
      [title, start, end, description, id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT rdv.*, rc.id AS contact_id, c.name AS contact_rdv
      FROM ${this.table} LEFT JOIN rdv_contact AS rc ON rdv.id = rc.rdv_id LEFT JOIN contact AS c ON rc.contact_id = c.id
      WHERE rdv.user_id=? ORDER BY rdv.start_rdv ASC`,
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

  async readCount(id) {
    const [rows] = await this.database.query(
      `SELECT COUNT(id) AS count FROM ${this.table} WHERE start_rdv = DATE(NOW()) AND user_id=?`,
      [id]
    );
    return rows[0];
  }

  async readByDateAndUserId(startDate, id) {
    const [rows] = await this.database.query(
      `SELECT id, title, start_rdv, end_rdv FROM ${this.table} WHERE start_rdv LIKE ? and user_id = ?`,
      [`${startDate}%`, id]
    );
    return rows;
  }

  async update(title, startDate, endDate, description, id) {
    const sql = `UPDATE ${this.table} SET `;

    const sqlParams = [];

    const sqlClause = {};

    if (title !== "") {
      sqlClause.title = "title = ?";
      sqlParams.push(title);
    }

    if (startDate !== "") {
      sqlClause.startDate = "start_rdv = ?";
      sqlParams.push(startDate);
    }

    if (endDate !== "") {
      sqlClause.endDate = "end_rdv = ?";
      sqlParams.push(endDate);
    }

    if (description !== "") {
      sqlClause.description = "description = ?";
      sqlParams.push(description);
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

module.exports = RdvManager;
