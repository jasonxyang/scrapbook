import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: "ok";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET": {
      res.status(200).json({ status: "ok" });
      break;
    }
  }
}
