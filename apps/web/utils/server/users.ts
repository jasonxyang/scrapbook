import { User } from "@prisma/client";
import prisma from "./prisma";

export type CreateUserParams = {
  email: User["email"];
};
export const createUser = async ({ email }: CreateUserParams) => {
  const user = await prisma.user.create({ data: { email } });
  return user;
};

type ReadUserParams = {
  userId: User["id"];
};
export const readUser = async ({ userId }: ReadUserParams) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  return user;
};

type UpdateUserParams = {
  userId: User["id"];
} & Partial<User>;
export const updateUser = async ({ userId, ...updates }: UpdateUserParams) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: updates,
  });
  return user;
};

type DeleteUserParams = {
  userId: User["id"];
};
export const deleteUser = async ({ userId }: DeleteUserParams) => {
  const user = await prisma.user.delete({ where: { id: userId } });
  return user;
};
