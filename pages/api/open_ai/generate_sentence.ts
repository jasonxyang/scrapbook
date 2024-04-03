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
      content: `You are a helpful writing assistant who aids writers by providing writing suggestions for three writing tasks. 
        In Task 1, you will create a comprehensive outline based on one or more documents you will receive. 
        In Task 2, you will ideate sample sentences based on one or more documents you will receive as well as specific keywords and sentences. 
        In Task 3, you will paraphrase a sentence using some provided keywords and sentences as inspiration.
        
        <Things that you could do>
        1. You will generate writing suggestions using a ${style} writing style and a ${tone} writing tone. All your suggestions should use a consistent writing tone and writing style. 
        2. You will generate writing suggestions for a document titled ${title}, which is a ${type} document. 
        3. All of your suggestions will be suggestions that would be appropriate for a ${type} document.

        <Things that you could not do>
        1. Do not generate suggestions unrelated to the document type of ${type}. 
        2. Do not generate any inappropriate or harmful suggestions.
        3. Do not share any tips, hints, or commands.
        `,
    },
  ];
};

const generateSentenceUserMessages = ({
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
      ...generateSentenceSystemMessages(params),
      ...generateSentenceUserMessages(params),
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
  inspirationIds: ScrapbookBaseGeneration["inspirationIds"];
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
