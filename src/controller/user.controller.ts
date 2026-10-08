import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { CreateUserInput, GetUserInput, UpdateUserInput,DeleteUserInput } from '../schema/user.schema.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser,} from '../service/user.service.js';

export const createUserHandler = asyncHandler<object, object, CreateUserInput['body']>(
  async (req, res) => {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  }
);

export const getUsersHandler = asyncHandler(
  async (_req, res: Response) => {
    const users = await getUsers();
    return res.status(200).json(users);
  }
);

export const getUserByIdHandler = asyncHandler<GetUserInput['params']>(
  async (req, res) => {
    const user = await getUserById({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  }
);

export const updateUserHandler = asyncHandler<
  UpdateUserInput['params'],
  object,
  UpdateUserInput['body']
>(async (req, res) => {
  const existingUser = await getUserById({ id: req.params.id });

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = await updateUser({ id: req.params.id }, req.body);
  return res.status(200).json(updatedUser);
});

export const deleteUserHandler = asyncHandler<DeleteUserInput['params']>(
  async (req, res) => {
    const existingUser = await getUserById({ id: req.params.id });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deleteUser({ id: req.params.id });
    return res.status(200).json({ message: 'User successfully archived' });
  }
);