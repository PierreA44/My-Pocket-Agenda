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
      `SELECT *  FROM ${this.table} WHERE rdv.user_id=? ORDER BY rdv.scheduled_date ASC , rdv.start_rdv ASC`,
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
      `SELECT COUNT(id) AS count FROM ${this.table} WHERE scheduled_date= DATE(NOW()) AND user_id=?`,
      [id]
    );
    return rows[0];
  }

  async readByDateAndUserId(date, id) {
    const [rows] = await this.database.query(
      `SELECT id, title, start_rdv, end_rdv FROM ${this.table} WHERE scheduled_date = ? and user_id = ?`,
      [date, id]
    );
    return rows;
  }

  async update(title, date, start, end, description, id) {
    const sql = `UPDATE ${this.table} SET `;

    const sqlParams = [];

    const sqlClause = {};

    if (title !== "") {
      sqlClause.title = "title = ?";
      sqlParams.push(title);
    }

    if (date !== "") {
      sqlClause.date = "scheduled_date = ?";
      sqlParams.push(date);
    }

    if (start !== "") {
      sqlClause.start = "start_rdv = ?";
      sqlParams.push(start);
    }

    if (end !== "") {
      sqlClause.end = "end_rdv = ?";
      sqlParams.push(end);
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
