import { openai } from "@/utils/server/open_ai";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET": {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that says 'ok' whenever a user asks a question.",
          },
          { role: "user", content: "Are you alive?" },
        ],
        model: "gpt-3.5-turbo",
      });
      res
        .status(200)
        .json({ status: completion.choices[0].message.content ?? "error" });
      break;
    }
  }
}
