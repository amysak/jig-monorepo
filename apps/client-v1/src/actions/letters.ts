import { ActionTypes } from "./types";

import { Letter } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getDefaultLettersRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_LETTERS_REQUEST,
  query,
});

const getDefaultLettersSuccess = (letters: ISerializedResponse<Letter>) => ({
  type: ActionTypes.GET_DEFAULT_LETTERS_SUCCESS,
  letters,
});

const getDefaultLettersFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_LETTERS_FAILURE,
  error,
});

const getOneLetterRequest = (letterId: string) => ({
  type: ActionTypes.GET_ONE_LETTER_REQUEST,
  letterId,
});

const getOneLetterSuccess = (letter: Letter) => ({
  type: ActionTypes.GET_ONE_LETTER_SUCCESS,
  letter,
});

const getOneLetterFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_LETTER_FAILURE,
  error,
});

const updateLetterRequest = (letterId: string, payload: Partial<Letter>) => ({
  type: ActionTypes.UPDATE_LETTER_REQUEST,
  letterId,
  payload,
});

const updateLetterSuccess = (partial: Partial<Letter>) => ({
  type: ActionTypes.UPDATE_LETTER_SUCCESS,
  partial,
});

const updateLetterFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_LETTER_FAILURE,
  error,
});

export {
  getDefaultLettersRequest,
  getDefaultLettersSuccess,
  getDefaultLettersFailure,
  getOneLetterRequest,
  getOneLetterSuccess,
  getOneLetterFailure,
  updateLetterRequest,
  updateLetterSuccess,
  updateLetterFailure,
};
