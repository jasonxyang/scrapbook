import { ScrapbookGenerationSystemParams } from "@/types";
import OpenAI from "openai";
import { ChatCompletionSystemMessageParam } from "openai/resources/index.mjs";

export const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const generateSystemPrompt = ({
  title,
  type,
  tone,
  style,
}: ScrapbookGenerationSystemParams): ChatCompletionSystemMessageParam[] => {
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
