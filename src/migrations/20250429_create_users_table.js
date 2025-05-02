import db from '../config/db.js';

export async function up() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        admin BOOLEAN DEFAULT false,
        name VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.log(error)
  }
}

export async function down() {
  try {
    await db.query('DROP TABLE IF EXISTS users');
    console.log("Table Users dropped successfully")
  } catch (error) {
    console.log(error)
  }
}

up()