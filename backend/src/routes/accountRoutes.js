import { Router } from "express";
import { AccountController } from "../controllers/accountControllers.js";
import { validateData } from "../middleware/validationMiddleware.js";
import { createAccountSchema, updatePasswordSchema, loginSchema } from "../schemas/accountSchemas.js";
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';


const router = Router();

// app.post('/createAccount', (req, res) => {
//     res.send('Create a new account');
// }); 

router.post('/login', validateData(loginSchema), AccountController.login);
router.post('/register', validateData(createAccountSchema), AccountController.createAccount);
router.post('/logout', AccountController.logout);

router.get('/', isAuthenticated, isAdmin, AccountController.getAllAccounts);
router.patch('/:id', isAuthenticated, AccountController.updateAccount);
router.delete('/:id', isAuthenticated, AccountController.deleteAccount);

export default router;