import { AccountModel } from "../models/accountModel";

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

    async updateAccount(accountId, oldPassword, newPassword) {
        if (!oldPassword || !newPassword) {
            throw new Error('Old and new passwords are required');
        }

        const updatedAccount = await AccountModel.updateAccountPassword(accountId, oldPassword, newPassword);
        return updatedAccount;
    },
  
    async deleteAccount(accountId) {
        // Delete Account
      return { message: 'Account deleted successfully' };
    }


};