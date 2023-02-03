import { AccountPreferences } from "../entities";
import { Preferences, Terms } from "./models";

export function isAccountPreferences(
  preferences: Preferences
): preferences is AccountPreferences {
  return !!(preferences as AccountPreferences).account;
}

export function isMultiTerms(
  terms: Terms
): terms is Terms & { payments: Terms["payments"]; type: "multi" } {
  return terms.type === "multi";
}
