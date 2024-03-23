const API_ROUTES = {
  open_ai: ["healthcheck"],
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
