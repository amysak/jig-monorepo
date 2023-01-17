import { ActionTypes } from "./types";

import { Material, MaterialType } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getDefaultMaterialsRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_REQUEST,
  query,
});

const getDefaultMaterialsSuccess = (
  materials: ISerializedResponse<Material>
) => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_SUCCESS,
  materials,
});

const getDefaultMaterialsFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_FAILURE,
  error,
});

const getSetupMaterialsRequest = (query: string) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_REQUEST,
  query,
});

const getSetupMaterialsSuccess = (
  materials: ISerializedResponse<Material>
) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_SUCCESS,
  materials,
});

const getSetupMaterialsFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_FAILURE,
  error,
});

const getOneMaterialRequest = (materialId: string) => ({
  type: ActionTypes.GET_ONE_MATERIAL_REQUEST,
  materialId,
});

const getOneMaterialSuccess = (material: Material) => ({
  type: ActionTypes.GET_ONE_MATERIAL_SUCCESS,
  material,
});

const getOneMaterialFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_MATERIAL_FAILURE,
  error,
});

const updateDefaultMaterialRequest = (
  materialId: string,
  payload: Partial<Material>
) => ({
  type: ActionTypes.UPDATE_DEFAULT_MATERIAL_REQUEST,
  materialId,
  payload,
});

const updateDefaultMaterialSuccess = (partial: Partial<Material>) => ({
  type: ActionTypes.UPDATE_DEFAULT_MATERIAL_SUCCESS,
  partial,
});

const updateDefaultMaterialFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_DEFAULT_MATERIAL_FAILURE,
  error,
});

const getDefaultMaterialsNamesRequest = () => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_NAMES_REQUEST,
});

const getDefaultMaterialsNamesSuccess = (
  materials: ISerializedResponse<Material>
) => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_NAMES_SUCCESS,
  materials,
});

const getDefaultMaterialsNamesFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_MATERIALS_NAMES_FAILURE,
  error,
});

const getSetupMaterialsNamesRequest = (query: string, key: string) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_NAMES_REQUEST,
  query,
  key,
});

const getSetupMaterialsNamesSuccess = (
  materials: ISerializedResponse<MaterialType>,
  key: string
) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_NAMES_SUCCESS,
  materials,
  key,
});

const getSetupMaterialsNamesFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_MATERIALS_NAMES_FAILURE,
  error,
});

const getRoomMaterialRequest = (roomId: string) => ({
  type: ActionTypes.GET_ROOM_MATERIAL_REQUEST,
  roomId,
});

const getRoomMaterialSuccess = (material: Material) => ({
  type: ActionTypes.GET_ROOM_MATERIAL_SUCCESS,
  material,
});

const getRoomMaterialFailure = (error: Error) => ({
  type: ActionTypes.GET_ROOM_MATERIAL_FAILURE,
  error,
});

const createRoomMaterialRequest = (roomId: string, payload: any) => ({
  type: ActionTypes.CREATE_ROOM_MATERIAL_REQUEST,
  roomId,
  payload,
});

const createRoomMaterialSuccess = (material: Material) => ({
  type: ActionTypes.CREATE_ROOM_MATERIAL_SUCCESS,
  material,
});

const createRoomMaterialFailure = (error: Error) => ({
  type: ActionTypes.CREATE_ROOM_MATERIAL_FAILURE,
  error,
});

const updateRoomMaterialRequest = (materialId: string) => ({
  type: ActionTypes.UPDATE_ROOM_MATERIAL_REQUEST,
  materialId,
});

const updateRoomMaterialSuccess = (material: Material) => ({
  type: ActionTypes.UPDATE_ROOM_MATERIAL_SUCCESS,
  material,
});

const updateRoomMaterialFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_ROOM_MATERIAL_FAILURE,
  error,
});

export {
  getDefaultMaterialsRequest,
  getDefaultMaterialsSuccess,
  getDefaultMaterialsFailure,
  getSetupMaterialsRequest,
  getSetupMaterialsSuccess,
  getSetupMaterialsFailure,
  getOneMaterialRequest,
  getOneMaterialSuccess,
  getOneMaterialFailure,
  updateDefaultMaterialRequest,
  updateDefaultMaterialSuccess,
  updateDefaultMaterialFailure,
  getDefaultMaterialsNamesRequest,
  getDefaultMaterialsNamesSuccess,
  getDefaultMaterialsNamesFailure,
  getSetupMaterialsNamesRequest,
  getSetupMaterialsNamesSuccess,
  getSetupMaterialsNamesFailure,
  getRoomMaterialRequest,
  getRoomMaterialSuccess,
  getRoomMaterialFailure,
  createRoomMaterialRequest,
  createRoomMaterialSuccess,
  createRoomMaterialFailure,
  updateRoomMaterialRequest,
  updateRoomMaterialSuccess,
  updateRoomMaterialFailure,
};
