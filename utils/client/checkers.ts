import {
  SCRAPBOOK_DOCUMENT_TYPES,
  ScrapbookDocumentParams,
  ScrapbookDocumentType,
  SCRAPBOOK_DOCUMENT_STYLES,
  ScrapbookDocumentStyle,
  SCRAPBOOK_DOCUMENT_TONES,
  ScrapbookTemplate,
  ScrapbookDocumentTone,
  ScrapbookDocument,
  ScrapbookTemplateInspiration,
} from "@/types";
import { array, custom, string } from "@recoiljs/refine";

export const scrapbookDocumentStyleChecker = () =>
  custom((value) => {
    return SCRAPBOOK_DOCUMENT_STYLES.includes(value as ScrapbookDocumentStyle)
      ? (value as ScrapbookDocumentStyle)
      : null;
  }, "Value is not a valid style");

export const scrapbookDocumentToneChecker = () =>
  custom((value) => {
    return SCRAPBOOK_DOCUMENT_TONES.includes(value as ScrapbookDocumentTone)
      ? (value as ScrapbookDocumentTone)
      : null;
  }, "Value is not a valid tone");

export const scrapbookDocumentTypeChecker = () =>
  custom((value) => {
    return SCRAPBOOK_DOCUMENT_TYPES.includes(value as ScrapbookDocumentType)
      ? (value as ScrapbookDocumentType)
      : null;
  }, "Value is not a valid document type");

export const scrapbookTemplateInspirationChecker = () =>
  custom((value) => {
    return string()((value as ScrapbookTemplateInspiration).content).type ===
      "success"
      ? (value as ScrapbookTemplateInspiration)
      : null;
  }, "Value is not a valid template inspiration");

export const scrapbookTemplateChecker = () =>
  custom((value) => {
    return string()((value as ScrapbookTemplate).id).type === "success" &&
      string()((value as ScrapbookTemplate).name).type === "success" &&
      string()((value as ScrapbookTemplate).content).type === "success" &&
      string()((value as ScrapbookTemplate).description).type === "success" &&
      array(scrapbookTemplateInspirationChecker())(
        (value as ScrapbookTemplate).inspiration
      ).type === "success" &&
      array(string())((value as ScrapbookTemplate).generationIds).type ===
        "success"
      ? (value as ScrapbookTemplate)
      : null;
  }, "Value is not a valid template");

export const scrapbookDocumentParamsChecker = () =>
  custom((value) => {
    return scrapbookDocumentToneChecker()(
      (value as ScrapbookDocumentParams).tone
    ).type === "success" &&
      scrapbookDocumentStyleChecker()((value as ScrapbookDocumentParams).style)
        .type === "success" &&
      string()((value as ScrapbookDocumentParams).title).type === "success" &&
      scrapbookDocumentTypeChecker()((value as ScrapbookDocumentParams).type)
        .type === "success"
      ? (value as ScrapbookDocumentParams)
      : null;
  }, "Value is not a valid document params");

export const scrapbookDocumentChecker = () =>
  custom((value) => {
    return scrapbookDocumentParamsChecker()(value as ScrapbookDocumentParams)
      .type === "success" &&
      string()((value as ScrapbookDocument).content).type === "success" &&
      string()((value as ScrapbookDocument).id).type === "success"
      ? (value as ScrapbookDocument)
      : null;
  }, "Value is not a valid scrapbook document");
