import { Router } from 'express';

import { LoginDTO, RegisterDTO, DeleteAccountDTO } from '../controllers/auth/auth.dto';
import * as authController from '../controllers/auth/auth';
import { validatePayload, authorizeUser } from '../middlewares/validation.middleware'

const router = Router();

router.post('/register', validatePayload(RegisterDTO), authController.register)

router.post('/login', validatePayload(LoginDTO), authController.login)

router.delete('/', authorizeUser, validatePayload(DeleteAccountDTO), authController.deleteAccount)

module.exports = router