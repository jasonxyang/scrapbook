import {
  DOCUMENT_TYPES,
  DocumentParams,
  DocumentType,
  STYLES,
  Style,
  TONES,
  Template,
  TemplateSection,
  Tone,
} from "@/types";
import { array, custom, string } from "@recoiljs/refine";

export const styleChecker = () =>
  custom((value) => {
    return STYLES.includes(value as Style) ? (value as Style) : null;
  }, "Value is not a valid style");

export const toneChecker = () =>
  custom((value) => {
    return TONES.includes(value as Tone) ? (value as Tone) : null;
  }, "Value is not a valid tone");

export const documentTypeChecker = () =>
  custom((value) => {
    return DOCUMENT_TYPES.includes(value as DocumentType)
      ? (value as DocumentType)
      : null;
  }, "Value is not a valid document type");

export const templateSectionChecker = () =>
  custom((value) => {
    return string()((value as TemplateSection).title).type === "success" &&
      array(string())((value as TemplateSection).keywords).type === "success" &&
      array(string())((value as TemplateSection).keySentences).type ===
        "success" &&
      string()((value as TemplateSection).content).type === "success"
      ? (value as TemplateSection)
      : null;
  }, "Value is not a template section");

export const templateChecker = () =>
  custom((value) => {
    return string()((value as Template).id).type === "success" &&
      string()((value as Template).name).type === "success" &&
      string()((value as Template).content).type === "success" &&
      string()((value as Template).description).type === "success" &&
      array(templateSectionChecker())((value as Template).sections).type ===
        "success"
      ? (value as Template)
      : null;
  }, "Value is not a valid template");

export const documentParamsChecker = () =>
  custom((value) => {
    return toneChecker()((value as DocumentParams).tone).type === "success" &&
      styleChecker()((value as DocumentParams).style).type === "success" &&
      string()((value as DocumentParams).title).type === "success" &&
      documentTypeChecker()((value as DocumentParams).documentType).type ===
        "success"
      ? (value as DocumentParams)
      : null;
  }, "Value is not a valid document params");
