// /backend/src/migrations/create_user_interactions_tables.js
import db from '../config/db.js';

export async function up() {
  try {
    // Table for storing liked places
    await db.query(`
      CREATE TABLE IF NOT EXISTS liked_places (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        place_id VARCHAR(255) NOT NULL,
        place_name VARCHAR(255) NOT NULL,
        liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table for storing skipped places
    await db.query(`
      CREATE TABLE IF NOT EXISTS skipped_places (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        place_id VARCHAR(255) NOT NULL,
        place_name VARCHAR(255) NOT NULL,
        skipped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table for tracking user engagement
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_engagement (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        session_start TIMESTAMP NOT NULL,
        session_end TIMESTAMP,
        swipe_count INT DEFAULT 0,
        like_count INT DEFAULT 0,
        skip_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table for place categories preferences
    await db.query(`
      CREATE TABLE IF NOT EXISTS category_preferences (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        category_name VARCHAR(100) NOT NULL,
        preference_score FLOAT DEFAULT 0,
        interaction_count INT DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unique(user_id, category_name)
      );
    `);

    // Table for tracking interaction patterns
    await db.query(`
      CREATE TABLE IF NOT EXISTS interaction_metrics (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
        avg_view_time FLOAT DEFAULT 0,
        daily_swipe_count INT DEFAULT 0,
        last_active TIMESTAMP,
        engagement_score FLOAT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
}

export async function down() {
  try {
    await db.query('DROP TABLE IF EXISTS interaction_metrics CASCADE');
    await db.query('DROP TABLE IF EXISTS category_preferences CASCADE');
    await db.query('DROP TABLE IF EXISTS user_engagement CASCADE');
    await db.query('DROP TABLE IF EXISTS skipped_places CASCADE');
    await db.query('DROP TABLE IF EXISTS liked_places CASCADE');
  } catch (error) {
    console.error('Migration rollback error:', error);
    throw error;
  }
}

up()