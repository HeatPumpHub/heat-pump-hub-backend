import { Router } from 'express';
import { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema } from '../schema/user.schema.js';
import validateResource from '../middleware/validateResource.middleware.js';
import { createUserHandler, deleteUserHandler, getUserByIdHandler, updateUserHandler } from '../controller/user.controller.js';
import { getItemsHandler } from '../controller/item.controller.js';

const userRouter = Router();

userRouter.post(
  '/',
  validateResource(createUserSchema),
  createUserHandler
);

userRouter.get(
  '/',
  getItemsHandler
);

userRouter.get(
  '/:id',
  validateResource(getUserSchema),
  getUserByIdHandler
);

userRouter.patch(
  '/:id',
  validateResource(updateUserSchema),
  updateUserHandler
);

userRouter.delete(
  '/:id',
  validateResource(deleteUserSchema),
  deleteUserHandler
);

export default userRouter;