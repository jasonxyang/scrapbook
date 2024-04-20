import { del, post } from "./fetch";
import { CreateSessionParams } from "../server/sessions";

export const createSession = async (params: CreateSessionParams) => {
  await post("/api/sessions", params);
};

export const deleteSession = async () => {
  await del("/api/sessions");
};
