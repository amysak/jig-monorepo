import { TGetDefaultTerms } from "api/terms";
import { Terms } from "entities";
import { IFetchResponse } from "utilities/types";

export const CLIENT_TERMS_SLICE_NAME = "CLIENT_TERMS_SLICE_NAME";

export interface ClientTermsState {
  term: IFetchResponse<Terms>;
  terms: IFetchResponse<TGetDefaultTerms>;
  terms_form: IFetchResponse<undefined>;
}
