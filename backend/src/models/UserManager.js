const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, user.hashedPassword]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email=?`,
      [email]
    );
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation

  async update(pseudo, email, id) {
    const sql = `UPDATE ${this.table} SET `;

    const sqlParams = [];

    const sqlClause = {};

    if (pseudo !== "") {
      sqlClause.pseudo = "pseudo = ?";
      sqlParams.push(pseudo);
    }

    if (email !== "") {
      sqlClause.email = "email = ?";
      sqlParams.push(email);
    }
    sqlParams.push(id);
    const [result] = await this.database.query(
      `${sql} ${Object.values(sqlClause).join()} WHERE id = ?`,
      sqlParams
    );
    return result.affectedRows;
  }

  async updateMdp(password, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET password = ? WHERE id = ?`,
      [password, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserManager;
