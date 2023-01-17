import { Cabinet, CabinetSpecification, Job } from "entities";
import { ISerializedResponse } from "utilities/utils";
import { TENTITIES_KEYS } from "../utilities/constants";
import { ActionTypes } from "./types";

const getOneCabinetRequest = (entity: TENTITIES_KEYS, entityId: Job["id"]) => ({
  type: ActionTypes.GET_ONE_CABINET_REQUEST,
  entity,
  entityId,
});

const getOneCabinetSuccess = (cabinet: [Cabinet[], number]) => ({
  type: ActionTypes.GET_ONE_CABINET_SUCCESS,
  cabinet,
});

const getOneCabinetFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_CABINET_FAILURE,
  error,
});

const getCabinetsByRoomRequest = (roomId: string, query?: string) => ({
  type: ActionTypes.GET_CABINETS_REQUEST,
  roomId,
  query,
});

const getCabinetsByRoomSuccess = (cabinets: ISerializedResponse<Cabinet>) => ({
  type: ActionTypes.GET_CABINETS_SUCCESS,
  cabinets,
});

const getCabinetsByRoomFailure = (error: Error) => ({
  type: ActionTypes.GET_CABINETS_FAILURE,
  error,
});

const createCabinetRequest = (payload: any) => ({
  type: ActionTypes.CREATE_CABINET_REQUEST,
  payload,
});

const createCabinetSuccess = (cabinet: Cabinet) => ({
  type: ActionTypes.CREATE_CABINET_SUCCESS,
  cabinet,
});

const createCabinetFailure = (error: Error) => ({
  type: ActionTypes.CREATE_CABINET_FAILURE,
  error,
});

const getSetupCabinetsRequest = (query: string) => ({
  type: ActionTypes.GET_SETUP_CABINETS_REQUEST,
  query,
});

const getSetupCabinetsSuccess = (cabinets: ISerializedResponse<Cabinet>) => ({
  type: ActionTypes.GET_SETUP_CABINETS_SUCCESS,
  cabinets,
});

const getSetupCabinetsFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_CABINETS_FAILURE,
  error,
});

const getOneCabinetByIdRequest = (id: string) => ({
  type: ActionTypes.GET_ONE_CABINET_BY_ID_REQUEST,
  id,
});

const getOneCabinetByIdSuccess = (cabinet: Cabinet) => ({
  type: ActionTypes.GET_ONE_CABINET_BY_ID_SUCCESS,
  cabinet,
});

const getOneCabinetByIdFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_CABINET_BY_ID_FAILURE,
  error,
});

const updateCabinetRequest = (id: string, payload: Record<any, any>) => ({
  type: ActionTypes.UPDATE_CABINET_REQUEST,
  id,
  payload,
});

const updateCabinetSuccess = (partial: any) => ({
  type: ActionTypes.UPDATE_CABINET_SUCCESS,
  partial,
});

const updateCabinetFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_CABINET_FAILURE,
  error,
});

export {
  getOneCabinetRequest,
  getOneCabinetSuccess,
  getOneCabinetFailure,
  createCabinetRequest,
  createCabinetSuccess,
  createCabinetFailure,
  getCabinetsByRoomRequest,
  getCabinetsByRoomSuccess,
  getCabinetsByRoomFailure,
  getSetupCabinetsRequest,
  getSetupCabinetsSuccess,
  getSetupCabinetsFailure,
  getOneCabinetByIdRequest,
  getOneCabinetByIdSuccess,
  getOneCabinetByIdFailure,
  updateCabinetRequest,
  updateCabinetSuccess,
  updateCabinetFailure,
};

//specification
export const getOneCabinetSpecificationRequest = (id: string) => ({
  type: ActionTypes.GET_ONE_CABINET_SPECIFICATION_REQUEST,
  id,
});

export const getOneCabinetSpecificationSuccess = (
  specification: CabinetSpecification
) => ({
  type: ActionTypes.GET_ONE_CABINET_SPECIFICATION_SUCCESS,
  specification,
});

export const getOneCabinetSpecificationFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_CABINET_SPECIFICATION_FAILURE,
  error,
});

export const updateCabinetSpecificationRequest = (
  id: string,
  payload: any
) => ({
  type: ActionTypes.UPDATE_CABINET_SPECIFICATION_REQUEST,
  id,
  payload,
});

export const updateCabinetSpecificationSuccess = (
  partial: Partial<CabinetSpecification>
) => ({
  type: ActionTypes.UPDATE_CABINET_SPECIFICATION_SUCCESS,
  partial,
});

export const updateCabinetSpecificationFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_CABINET_SPECIFICATION_FAILURE,
  error,
});

export const createCabinetSpecificationRequest = (
  payload: CabinetSpecification
) => ({
  type: ActionTypes.CREATE_CABINET_SPECIFICATION_REQUEST,
  payload,
});

export const createCabinetSpecificationSuccess = (
  specification: CabinetSpecification
) => ({
  type: ActionTypes.CREATE_CABINET_SPECIFICATION_SUCCESS,
  specification,
});

export const createCabinetSpecificationFailure = (error: Error) => ({
  type: ActionTypes.CREATE_CABINET_SPECIFICATION_FAILURE,
  error,
});
