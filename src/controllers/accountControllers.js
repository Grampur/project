import { AccountService } from '../services/accountService.js';


export const AccountController = {

    async getAllAccounts(req, res) {

        res.send('Get all accounts');
        
        try {
            const accounts = await AccountService.getAllAccount();

            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }

    },

    async createAcccount(req, res) {

        res.send('Create a new Account');

        try {
            const newAccount = await AccountService.createAccount(req.body);

            res.status(200).json(newAccount);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },

    async updateAccount(req, res) {

        res.send('Update some fields for existing Account');

        try {
            const accountId = parseInt(req.params.id, 10);
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Both old and new passwords are required' });
            }

            const updatedAccount = await AccountService.updateAccountPassword(accountId, oldPassword, newPassword);
            res.status(200).json(updatedAccount);
        } catch (error) {
            res.status(400).json({ message: error.message || 'Failed to update password' });
        }
    },

    async deleteAccount(req, res) {

        res.send('Delete a account');

        try {
            const accountId = parseInt(req.params.id, 10);
            const account = await AccountService.deleteAccount(accountId);

            res.status(200).json(account);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },
};