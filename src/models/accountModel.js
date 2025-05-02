import db from "../config/db.js";
import argon2 from "argon2";

export const AccountModel = {
    async getAllAccount() {
        const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows;
    },

    async createAccount({ name, admin, email, password }) {
        const hashedPassword = await argon2.hash(password);
        const result = await db.query(
            `INSERT INTO users (name, admin, email, password) 
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, admin, email, created_at`,
            [name, admin, email, hashedPassword]
        );
        return result.rows[0];
    },

    async updateAccountPassword(accountId, oldPassword, newPassword) {
        // 1. Get user from DB
        const result = await db.query(
            `SELECT password FROM users WHERE id = $1`,
            [accountId]
        );
    
        if (result.rowCount === 0) {
            throw new Error('User not found');
        }
    
        const currentHashedPassword = result.rows[0].password;
    
        // 2. Verify old password
        const valid = await argon2.verify(currentHashedPassword, oldPassword);
        if (!valid) {
            throw new Error('Incorrect current password');
        }
    
        // 3. Hash new password and update
        const newHashedPassword = await argon2.hash(newPassword);
        const updateResult = await db.query(
            `UPDATE users
             SET password = $1
             WHERE id = $2
             RETURNING id, name, admin, email, created_at`,
            [newHashedPassword, accountId]
        );
    
        return updateResult.rows[0];
    },

    async deleteAccount(accountId) {
        const result = await db.query('DELETE FROM users WHERE id = $1', [accountId]);
        return result.rowCount;
    }
};
