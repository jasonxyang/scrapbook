export const SCRAPBOOK_PAGE_ROUTES = {
  "": [],
  documents: ["create"],
  templates: ["create"],
} as const;

export type ScrapbookPageRoute = {
  [key in keyof typeof SCRAPBOOK_PAGE_ROUTES]:
    | `/${key}/${(typeof SCRAPBOOK_PAGE_ROUTES)[key][number]}`
    | `/${key}`;
}[keyof typeof SCRAPBOOK_PAGE_ROUTES];

const SCRAPBOOK_API_ROUTES = {
  open_ai: ["healthcheck", "generate_sentence"],
  healthcheck: [],
} as const;

export type ScrapbookApiRoute = {
  [key in keyof typeof SCRAPBOOK_API_ROUTES]:
    | `/api/${key}/${(typeof SCRAPBOOK_API_ROUTES)[key][number]}`
    | `/api/${key}`;
}[keyof typeof SCRAPBOOK_API_ROUTES];

const SCRAPBOOK_JOTAI_KEYS = {
  documents: ["documentIds", "documentsById", "documentsSelector"],
  templates: [
    "templateIds",
    "templatesById",
    "templateSelector",
    "templatesSelector",
    "deleteTemplateId",
    "createTemplateId",
  ],
  generations: [
    "generationIds",
    "generationsById",
    "generationProgressesByGenerationId",
  ],
  inspirations: ["inspirationIds", "inspirationsById", "inspirationsSelector"],
} as const;

export type ScrapbookJotaiKey = {
  [key in keyof typeof SCRAPBOOK_JOTAI_KEYS]: `${(typeof SCRAPBOOK_JOTAI_KEYS)[key][number]}`;
}[keyof typeof SCRAPBOOK_JOTAI_KEYS];

export const SCRAPBOOK_DOCUMENT_STYLES = [
  "Narrative",
  "Descriptive",
  "Expository",
  "Persuasive",
  "Creative",
  "Poetic",
  "Technical",
  "Argumentative",
] as const;

export type ScrapbookDocumentStyle = (typeof SCRAPBOOK_DOCUMENT_STYLES)[number];

export const SCRAPBOOK_DOCUMENT_TONES = [
  "Formal",
  "Informal",
  "Playful",
  "Assertive",
  "Casual",
  "Informative",
  "Emotional",
  "Inquisitive",
] as const;

export type ScrapbookDocumentTone = (typeof SCRAPBOOK_DOCUMENT_TONES)[number];

export const SCRAPBOOK_DOCUMENT_TYPES = [
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

export type ScrapbookDocumentType = (typeof SCRAPBOOK_DOCUMENT_TYPES)[number];

export type ScrapbookTemplate = {
  id: string;
  name: string;
  description: string;
  content: string;
  inspirationIds: string[];
  generationIds: string[];
};

export type ScrapbookInspiration = {
  id: string;
  templateId: string;
  nodeKeys: string[];
  content: string;
};

export const SCRAPBOOK_GENERATION_TYPES = ["sentence"] as const;
export type ScrapbookGenerationType =
  (typeof SCRAPBOOK_GENERATION_TYPES)[number];

export type ScrapbookGeneration = ScrapbookSentenceGeneration;

type ScrapbookBaseGeneration = {
  id: string;
};

type ScrapbookGenerationParams = {
  documentParams: ScrapbookDocumentParams;
};

export type ScrapbookSentenceGeneration = ScrapbookBaseGeneration &
  ScrapbookGenerationParams & {
    type: "sentence";
    content: string;
  };

export type ScrapbookDocument = ScrapbookDocumentParams & {
  id: string;
  content: string;
};

export type ScrapbookDocumentParams = {
  tone: ScrapbookDocumentTone;
  style: ScrapbookDocumentStyle;
  title: string;
  type: ScrapbookDocumentType;
};

export type ScrapbookTemplateParams = {
  id: string;
  title: string;
  keywords: string[];
  keySentences: string[];
};

export type ScrapbookGenerationProgress = {
  generationId: string;
  isGenerating: boolean;
};
