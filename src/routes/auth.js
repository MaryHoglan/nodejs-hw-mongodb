import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  registerController,
  loginController,
  logoutController,
  refreshController,

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
  '/logout', ctrlWrapper(logoutController)
);

router.post(
  '/refresh', ctrlWrapper(refreshController)
);


export default router;
