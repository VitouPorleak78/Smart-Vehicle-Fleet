const { pool } = require('../config/db');

const getUsers = async (req, res, next) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, role, status FROM users ORDER BY id ASC'
    );

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const role = req.body.role?.trim();
  const status = req.body.status?.trim();

  if (!name || !email || !role || !status) {
    return res.status(400).json({ success: false, message: 'Name, email, role, and status are required.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }

  if (name.length > 100 || email.length > 150 || role.length > 50 || status.length > 50) {
    return res.status(400).json({ success: false, message: 'One or more fields exceed the database limits.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "SELECT COALESCE(MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)), 0) AS lastId FROM users WHERE id REGEXP '^USR-[0-9]+$' FOR UPDATE"
    );
    const id = `USR-${String(Number(rows[0].lastId) + 1).padStart(2, '0')}`;

    await connection.query(
      'INSERT INTO users (id, name, email, role, status) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, role, status]
    );
    await connection.commit();

    return res.status(201).json({ success: true, data: { id, name, email, role, status } });
  } catch (error) {
    if (connection) await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'A user with this email already exists.' });
    }

    return next(error);
  } finally {
    if (connection) connection.release();
  }
};

const getServiceSummary = async (req, res, next) => {
  try {
    const mockSummary = {
      activeAlerts: 4,
      fleetUtilization: '87.4%',
      pendingMaintenanceJobs: 12,
      systemStatus: 'Optimal'
    };

    res.status(200).json({ success: true, data: mockSummary });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, createUser, getServiceSummary };
