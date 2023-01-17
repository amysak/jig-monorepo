import { Letter } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetDefaultLettersData = ResponseDataWithCount<Letter>;

function getDefaultLetters(query = ""): AsyncResponse<TGetDefaultLettersData> {
  return api.get(`/defaultsetup/letters${query}`);
}

function getOneLetter(letterId: string): AsyncResponse<Letter> {
  return api.get(`/letters/${letterId}`);
}

function updateLetter(
  letterId: string,
  payload: undefined
): AsyncResponse<Letter> {
  return api.update(`/letters/${letterId}`, payload);
}

function createLetter(payload: {
  is_default: boolean;
  status: any;
}): AsyncResponse<Letter> {
  return api.post("/letters", payload);
}

function deleteLetter(id: string): AsyncResponse<any> {
  return api.delete(`/letters/${id}`);
}

function duplicateLetter(payload: { id: any }): AsyncResponse<Letter> {
  return api.post("/letters/duplicate", payload);
}

export {
  getDefaultLetters,
  getOneLetter,
  updateLetter,
  createLetter,
  deleteLetter,
  duplicateLetter,
};
