import { Terms } from "./models";

export function isMultiTerms(
  terms: Terms
): terms is Terms & { payments: Terms["payments"]; type: "multi" } {
  return terms.type === "multi";
}
