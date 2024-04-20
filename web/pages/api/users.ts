import { ScrapbookApiReponseData } from "@/types";
import {
  createUser,
  deleteUser,
  readUser,
  updateUser,
} from "@/utils/server/users";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapbookApiReponseData<User>>
) {
  switch (req.method) {
    case "GET": {
      try {
        const user = await readUser({ userId: req.query.userId as string });
        res.status(200).json({ status: "success", data: user });
      } catch (error: any) {
        if ((error.code = "P2025")) res.status(404).json({ status: "error" });
        else res.status(500).json({ status: "error" });
      }
      break;
    }
    case "POST": {
      try {
        const user = await createUser({ email: req.body.email });
        res.status(200).json({ status: "success", data: user });
      } catch (error: any) {
        res.status(500).json({ status: "error" });
      }
    }
    case "PUT": {
      try {
        const user = await updateUser({
          userId: req.query.userId as string,
          ...req.body,
        });
        res.status(200).json({ status: "success", data: user });
      } catch (error: any) {
        res.status(500).json({ status: "error" });
      }
    }
    case "DELETE": {
      try {
        const user = await deleteUser({ userId: req.query.userId as string });
        res.status(200).json({ status: "success", data: user });
      } catch (error: any) {
        res.status(500).json({ status: "error" });
      }
    }
    default: {
      res.status(405).json({ status: "error" });
    }
  }
}
