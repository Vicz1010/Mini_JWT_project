import express from 'express';
import {
  getAllUsers,
  login,
  register,
  validateToken,
} from '../controllers/userController';
import extractJWT from '../middleware/extractJWT';

const userRouter = express.Router();

userRouter.get('/validate', extractJWT, validateToken);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers);

export default userRouter;
