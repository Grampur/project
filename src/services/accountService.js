import { AccountModel } from "../models/accountModel.js";
import argon2 from 'argon2';

export const AccountService = {

    async getAllAccount() {
        return AccountModel.getAllAccount();
    },

    async createAccount(newAccount) {
        // Create Account
        const { name, admin, email, password } = newAccount;

        const sanitizedAccount = {
            name: name?.trim(),
            admin,
            email: email?.trim(),
            password: password?.trim(),
        };

        const createdAccount = await AccountModel.createAccount(sanitizedAccount);
        return createdAccount;

    },

    async updateAccountPassword(accountId, oldPassword, newPassword) {
        if (!oldPassword || !newPassword) {
            throw new Error('Old and new passwords are required');
        }

        const updatedAccount = await AccountModel.updateAccountPassword(accountId, oldPassword, newPassword);
        return updatedAccount;
    },
  
    async deleteAccount(accountId) {

        const result = await AccountModel.deleteAccount(accountId);

        // Check if any row was actually deleted
        if (result === 0) {
            throw new Error('Account not found');
        }
    
        // Return success message
        return { message: 'Account deleted successfully' };
    },

    async verifyCredentials(email, password) {
      
        const user = await AccountModel.findByEmail(email);
      
        if (!user) {
            return null;
        }
      
        const isValidPassword = await argon2.verify(user.password, password);
        if (!isValidPassword) {
            return null;
        }

        return user;
    }

};