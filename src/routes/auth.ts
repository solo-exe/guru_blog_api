import { Router } from 'express';

import { LoginDTO, RegisterDTO, DeleteAccountDTO } from '../controllers/auth/auth.dto';
import * as authController from '../controllers/auth/auth';
import { validatePayload, authorizeUser } from '../middlewares/validation.middleware'

const router = Router();

router.post('/register', validatePayload(RegisterDTO, 'body'), authController.register)

router.post('/login', validatePayload(LoginDTO, 'body'), authController.login)

router.delete('/', authorizeUser, validatePayload(DeleteAccountDTO, 'body'), authController.deleteAccount)

module.exports = router