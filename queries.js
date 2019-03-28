const Pool = require("pg").Pool;
const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query({
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id]
    })
    .then(response => {
      res.status(200).json(results.rows);
    })
    .catch(err => {
      throw err;
    });
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  pool
    .query({
      text: "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
      values: [name, email]
    })
    .then(response => {
      res.status(200).send(`User added with ID: ${response.rows[0].id}`);
    })
    .catch(err => {
      throw err;
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool
    .query({
      text: `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id`,
      values: [name, email, id]
    })
    .then(response => {
      res.status(200).send(`User updated with ID: ${response.rows[0].id}`);
    })
    .catch(err => {
      throw err;
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
