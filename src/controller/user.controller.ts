import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { CreateUserInput, GetUserInput, UpdateUserInput,DeleteUserInput } from '../schema/user.schema.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser,} from '../service/user.service.js';

export const createUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateUserInput['body']> , res: Response) => {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  }
);

export const getUsersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getUsers();
    return res.status(200).json(users);
  }
);

export const getUserByIdHandler = asyncHandler(
  async (req: Request<GetUserInput['params']>, res: Response) => {
    const user = await getUserById({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  }
);

export const updateUserHandler = asyncHandler(
    async (
        req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, 
        res: Response
    ) => {
      const existingUser = await getUserById({ id: req.params.id });

      if (!existingUser) return res.status(404).json({ message: 'User not found' });

      const updatedUser = await updateUser({ id: req.params.id }, req.body);
      return res.status(200).json(updatedUser);
    }
);

export const deleteUserHandler = asyncHandler(
  async (
         req: Request<DeleteUserInput['params']>,
         res: Response
  ) => {
    const existingUser = await getUserById({ id: req.params.id });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deleteUser({ id: req.params.id });
    return res.status(200).json({ message: 'User successfully archived' });
  }
);