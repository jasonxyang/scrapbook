import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  organization: 'org-PdWNMztjOJT3krrzLy5ydS9L',
});
