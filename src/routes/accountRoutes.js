import { Router } from "express";
import { AccountController } from "../controllers/accountControllers.js";
import { validateData } from "../middleware/validationMiddleware.js";
import { createAccountSchema, updatePasswordSchema } from "../schemas/accountSchemas.js";

const router = Router();

// app.post('/createAccount', (req, res) => {
//     res.send('Create a new account');
// }); 

router.get('/', AccountController.getAllAccounts)
router.post('/', validateData(createAccountSchema), AccountController.createAccount);
router.patch('/:id', validateData(updatePasswordSchema), AccountController.updateAccount);
router.delete('/:id', AccountController.deleteAccount)
  
export default router;