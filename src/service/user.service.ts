import { prisma } from '../utils/prisma.js';
import { Prisma } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema.js';

export async function createUser(input: CreateUserInput['body']) {
  return prisma.user.create({
    data: input as unknown as Prisma.UserCreateInput,
  });
}

export async function getUsers(where?: Prisma.UserWhereInput) {
  return prisma.user.findMany({
    where: {
      ...where,
      status: where?.status ?? 'ACTIVE',
    },
  });
}

export async function getUserById(where: Prisma.UserWhereUniqueInput) {
  return prisma.user.findUnique({
    where,
  });
}

export async function updateUser(
  where: Prisma.UserWhereUniqueInput,
  data: UpdateUserInput['body']
) {
  return prisma.user.update({
    where,
    data: data as unknown as Prisma.UserUpdateInput,
  });
}

export async function deleteUser(where: Prisma.UserWhereUniqueInput) {
  return prisma.user.update({
    where,
    data: {
      status: 'ARCHIVED',
    },
  });
}