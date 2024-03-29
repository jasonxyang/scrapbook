import {
  ScrapbookDocumentType,
  ScrapbookGeneration,
  ScrapbookDocumentStyle,
  ScrapbookTemplateSection,
  ScrapbookDocumentTone,
} from "@/types";
import { openai } from "@/utils/server/open_ai";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";

type GenerateSentenceSystemMessagesParams = {
  documentTitle: string;
  documentType: ScrapbookDocumentType;
  documentStyle: ScrapbookDocumentStyle;
  documentTone: ScrapbookDocumentTone;
};
const generateSentenceSystemMessages = ({
  documentTitle,
  documentType,
  documentTone,
  documentStyle,
}: GenerateSentenceSystemMessagesParams): ChatCompletionSystemMessageParam[] => {
  return [
    {
      role: "system",
      content: `You are an assistant that generates a sentence within a ${documentType} document titled ${documentTitle} with a ${documentStyle} style and ${documentTone} tone.`,
    },
  ];
};
type GenerateSentenceUserMessagesParams = {
  sectionTitle: ScrapbookTemplateSection["title"];
  sectionKeySentences: ScrapbookTemplateSection["keySentences"];
  sectionKeywords: ScrapbookTemplateSection["keywords"];
};
const generateSentenceUserMessages = ({
  sectionTitle,
  sectionKeywords,
  sectionKeySentences,
}: GenerateSentenceUserMessagesParams): ChatCompletionUserMessageParam[] => {
  return [
    {
      role: "user",
      content: `I will provide you with a list of keywords and key sentences. Using the keywords and key sentences I give you, please generate a sentence for a section within a document titled ${sectionTitle}, that is related to keywords and key sentences I provide.`,
    },
    {
      role: "user",
      content: `Here is the list of keywords: ${sectionKeywords}. Here is the list of key sentences: ${sectionKeySentences}. Please generate a sentence.`,
    },
  ];
};

export type GenerateSentenceParams = GenerateSentenceSystemMessagesParams &
  GenerateSentenceUserMessagesParams;

const generateSentence = async ({
  sectionTitle,
  sectionKeySentences,
  sectionKeywords,
  documentTitle,
  documentType,
  documentStyle,
  documentTone,
}: GenerateSentenceParams) => {
  const completion = await openai.chat.completions.create({
    messages: [
      ...generateSentenceSystemMessages({
        documentTitle,
        documentType,
        documentStyle,
        documentTone,
      }),
      ...generateSentenceUserMessages({
        sectionTitle,
        sectionKeywords,
        sectionKeySentences,
      }),
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};

export type GenerateSentenceResponseData = {
  successs: boolean;
  data: ScrapbookGeneration | null;
};
export type GenerateSentenceRequestBody = GenerateSentenceSystemMessagesParams &
  GenerateSentenceUserMessagesParams & {
    generationId?: string;
    sectionId: string;
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSentenceResponseData>
) {
  switch (req.method) {
    case "POST": {
      const {
        sectionId,
        sectionTitle,
        sectionKeywords,
        sectionKeySentences,
        documentTitle,
        documentType,
        documentStyle,
        documentTone,
        generationId,
      } = req.body;

      const sentence = await generateSentence({
        sectionTitle,
        sectionKeywords,
        sectionKeySentences,
        documentTitle,
        documentType,
        documentStyle,
        documentTone,
      });

      res.status(200).json({
        successs: !!sentence,
        data: sentence
          ? {
              id: generationId ?? nanoid(),
              type: "sentence",
              content: sentence,
              documentParams: {
                documentType,
                style: documentStyle,
                tone: documentTone,
                title: documentTitle,
              },
              templateParams: {
                id: sectionId,
                title: sectionTitle,
                keywords: sectionKeywords,
                keySentences: sectionKeySentences,
              },
            }
          : null,
      });
      break;
    }
  }
}
