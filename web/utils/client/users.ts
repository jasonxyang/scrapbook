import { CreateUserParams } from "../server/users";
import { post } from "./fetch";

export const createUser = async (params: CreateUserParams) => {
  return await post("/api/users", params);
};
