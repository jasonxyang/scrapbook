import { signIn, signOut } from "./auth";

export type CreateSessionParams = {
  email: string;
  redirectTo?: string;
};
export const createSession = async ({
  email,
  redirectTo,
}: CreateSessionParams) => {
  await signIn("resend", { email, redirectTo });
};

export const deleteSession = async () => {
  await signOut();
};
