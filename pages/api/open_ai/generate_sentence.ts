import { ScrapbookBaseGeneration, ScrapbookSentenceGeneration } from "@/types";
import { generateSystemPrompt, openai } from "@/utils/server/open_ai";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";

const generateUserMessages = ({
  title,
  type,
  tone,
  style,
  inspiration,
}: ScrapbookSentenceGeneration["params"]): ChatCompletionUserMessageParam[] => {
  return [
    {
      role: "user",
      content: `Your task is to generate a relevant sentence that would belong in a ${type} document for a document titled ${title}. 
      Your generated sentence must use a ${style} writing style and a ${tone} writing tone. 
      Here is the list of keywords and key sentences: ${inspiration}. 
      Generate a sentence using these instructions. 
      
      <Output length> 
      Your generated sentence should be exactly one sentence. It should not exceed one sentence.`,
    },
  ];
};

const generateSentence = async (
  params: ScrapbookSentenceGeneration["params"]
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      ...generateSystemPrompt(params),
      ...generateUserMessages(params),
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};

export type GenerateSentenceResponseData = {
  successs: boolean;
  data: ScrapbookSentenceGeneration | null;
};
export type GenerateSentenceRequestBody = {
  existingId?: ScrapbookBaseGeneration["id"];
  documentId: ScrapbookBaseGeneration["documentId"];
  templateId: ScrapbookBaseGeneration["templateId"];
  inspirationIds: ScrapbookSentenceGeneration["inspirationIds"];
  params: ScrapbookSentenceGeneration["params"];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSentenceResponseData>
) {
  switch (req.method) {
    case "POST": {
      const { params, existingId, documentId, templateId, inspirationIds } =
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
              inspirationIds,
            }
          : null,
      });
      break;
    }
  }
}
