const db = require('../utils/database')

db.query(`
  CREATE TABLE IF NOT EXISTS users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  phone VARCHAR(14),
  email VARCHAR(50),
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)`)