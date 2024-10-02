import { ScrapbookApiReponseData } from "@/types";
import { createSession, deleteSession } from "@/utils/server/sessions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapbookApiReponseData>
) {
  switch (req.method) {
    case "POST": {
      try {
      } catch (error: any) {
        await createSession({
          email: req.body.email,
          redirectTo: req.body.redirectTo,
        });
        res.status(500).json({ status: "error" });
      }
    }
    case "DELETE": {
      try {
        await deleteSession();
      } catch (error: any) {
        res.status(500).json({ status: "error" });
      }
    }
    default: {
      res.status(405).json({ status: "error" });
    }
  }
}
