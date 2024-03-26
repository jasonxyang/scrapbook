import { array, custom, string } from "@recoiljs/refine";

const API_ROUTES = {
  open_ai: ["healthcheck", "generate_sentence"],
  healthcheck: [],
} as const;

export type ApiRoute = {
  [key in keyof typeof API_ROUTES]:
    | `/api/${key}/${(typeof API_ROUTES)[key][number]}`
    | `/api/${key}`;
}[keyof typeof API_ROUTES];

export const STYLES = [
  "Narrative",
  "Descriptive",
  "Expository",
  "Persuasive",
  "Creative",
  "Poetic",
  "Technical",
  "Argumentative",
] as const;

export type Style = (typeof STYLES)[number];

export const isStyle = (value: any): value is Style =>
  STYLES.includes(value as Style);

export const TONES = [
  "Formal",
  "Informal",
  "Playful",
  "Assertive",
  "Casual",
  "Informative",
  "Emotional",
  "Inquisitive",
] as const;

export type Tone = (typeof TONES)[number];

export const isTone = (value: any): value is Tone =>
  TONES.includes(value as Tone);

export const DOCUMENT_TYPES = [
  "Academic Essay",
  "Business Letter",
  "Creative Writing",
  "Design Documentation",
  "Fellowship/Scholarship",
  "Application",
  "Legal Document",
  "Marketing Copy",
  "Technical Report",
  "Other",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const isDocumentType = (value: any): value is DocumentType =>
  DOCUMENT_TYPES.includes(value as DocumentType);

export type Template = {
  id: string;
  name: string;
  description: string;
  sections: TemplateSection[];
  content: string;
};

export const isTemplate = (value: any): value is Template => {
  return (
    string()(value.id).type === "success" &&
    string()(value.name).type === "success" &&
    string()(value.content).type === "success" &&
    string()(value.description).type === "success" &&
    array(custom((section) => isTemplateSection(section)))(value.sections)
      .type === "success"
  );
};

export type TemplateSection = {
  title: string;
  keywords: string[];
  keySentences: string[];
  content: string;
};

export const isTemplateSection = (value: any): value is TemplateSection => {
  return (
    string()(value.title).type === "success" &&
    array(string())(value.keywords).type === "success" &&
    array(string())(value.keySentences).type === "success" &&
    string()(value.content).type === "success"
  );
};

export const GENERATION_TYPES = ["sentence"] as const;
export type GenerationType = (typeof GENERATION_TYPES)[number];

export const isGenerationType = (value: any): value is GenerationType =>
  GENERATION_TYPES.includes(value as GenerationType);

export type Generation = SentenceGeneration;

type GenerationParams = {
  sectionParams: Pick<TemplateSection, "title" | "keywords" | "keySentences">;
  documentParams: {
    documentType: DocumentType;
    tone: Tone;
    style: Style;
    title: string;
  };
};

export type SentenceGeneration = {
  type: "sentence";
  content: string;
} & GenerationParams;

export const isSentenceGeneration = (value: any) => {
  return (
    isGenerationType(value.type) &&
    value.type === "sentence" &&
    string()(value.content).type === "success"
  );
};

export const isGenerationSectionParams = (
  value: any
): value is Generation["sectionParams"] => {
  return (
    string()(value.title).type === "success" &&
    array(string())(value.keywords).type === "success" &&
    array(string())(value.keySentences).type === "success"
  );
};

export const isGenerationDocumentParams = (
  value: any
): value is Generation["sectionParams"] => {
  return (
    isDocumentType(value.documentType) &&
    isStyle(value.style) &&
    isTone(value.tone) &&
    string()(value.title).type === "success"
  );
};

export const isGeneration = (value: any): value is Generation => {
  return (
    isSentenceGeneration(value) &&
    isGenerationSectionParams(value.sectionParams) &&
    isGenerationDocumentParams(value.documentParams)
  );
};
