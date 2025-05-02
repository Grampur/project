import { AccountService } from '../services/accountService.js';

export const AccountController = {
    async getAllAccounts(req, res) {
        try {
            const accounts = await AccountService.getAllAccount();
            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async createAccount(req, res) {  // Fixed spelling (was createAcccount)
        try {
            const newAccount = await AccountService.createAccount(req.body);
            res.status(201).json(newAccount);  // Changed to 201 for creation
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async updateAccount(req, res) {
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
        try {
            const accountId = parseInt(req.params.id, 10);
            const account = await AccountService.deleteAccount(accountId);
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AccountService.verifyCredentials(email, password);

            if (user) {
                // Store user info in session
                req.session.userId = user.id;
                req.session.userEmail = user.email;
                req.session.isAdmin = user.admin;
              
                res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        admin: user.admin
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging out' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logged out successfully' });
        });
    }

};