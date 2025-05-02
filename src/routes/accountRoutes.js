import { Router } from "express";
import { AccountController } from "../controllers/accountControllers.js";

const router = Router();

// app.post('/createAccount', (req, res) => {
//     res.send('Create a new account');
// }); 

router.get('/', AccountController.getAllAccounts)
router.post('/', AccountController.createAccount)
router.patch('/:id', AccountController.updateAccount)
router.delete('/:id', AccountController.deleteAccount)
  
export default router;