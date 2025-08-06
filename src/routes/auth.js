import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestPasswordResetController,
  resetPasswordController,

} from '../controllers/auth.js';

const router = Router();


router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutController)
);

router.post(
  '/refresh',
  ctrlWrapper(refreshController)
);

router.post(
  '/request-password-reset',
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController));

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)); 


export default router;
