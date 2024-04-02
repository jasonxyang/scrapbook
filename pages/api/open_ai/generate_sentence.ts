import {
  ScrapbookGeneration,
  ScrapbookBaseGeneration,
  ScrapbookSentenceGeneration,
} from "@/types";
import { openai } from "@/utils/server/open_ai";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";

const generateSentenceSystemMessages = ({
  title,
  type,
  tone,
  style,
}: ScrapbookSentenceGeneration["params"]): ChatCompletionSystemMessageParam[] => {
  return [
    {
      role: "system",
      content: `You are an assistant that generates a sentence within a ${type} document titled ${title} with a ${style} style and ${tone} tone.`,
    },
  ];
};

const generateSentenceUserMessages = (): ChatCompletionUserMessageParam[] => {
  return [
    {
      role: "user",
      content: `Please generate a sentence.`,
    },
  ];
};

const generateSentence = async (
  params: ScrapbookSentenceGeneration["params"]
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      ...generateSentenceSystemMessages(params),
      ...generateSentenceUserMessages(),
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};

export type GenerateSentenceResponseData = {
  successs: boolean;
  data: ScrapbookGeneration | null;
};
export type GenerateSentenceRequestBody = {
  existingId?: ScrapbookBaseGeneration["id"];
  documentId: ScrapbookBaseGeneration["documentId"];
  templateId: ScrapbookBaseGeneration["templateId"];
  params: ScrapbookSentenceGeneration["params"];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSentenceResponseData>
) {
  switch (req.method) {
    case "POST": {
      const { params, existingId, documentId, templateId } =
        req.body as GenerateSentenceRequestBody;

      const sentence = await generateSentence({
        ...params,
      });

      res.status(200).json({
        successs: !!sentence,
        data: sentence
          ? {
              id: existingId ?? nanoid(),
              type: "sentence",
              content: sentence,
              params,
              documentId,
              templateId,
            }
          : null,
      });
      break;
    }
  }
}
