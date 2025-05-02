import db from '../config/db.js';

export async function up() {
    try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR NOT NULL COLLATE "default" PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
        console.log("Table Sessions created successfully");
    } catch (error) {
        console.log(error);
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS sessions');
        console.log("Table Sessions dropped successfully");
    } catch (error) {
        console.log(error);
    }
}

up();