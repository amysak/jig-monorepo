import React, { Context, createContext, useReducer } from "react";
import {
  createRoomMaterial,
  getDefaultMaterials,
  getOneMaterial,
  getRoomMaterial,
  getSetupMaterials,
  updateMaterial,
} from "../api/materials";

interface IInitialState {
  material: { name?: string };
  materials: [Array<any>, number];
  defaultMaterials: [Array<any>, number];
  loading: boolean;
}

const initialState: IInitialState = {
  material: {},
  materials: [[], 0],
  defaultMaterials: [[], 0],
  loading: false,
};

const actions = {
  SET_MATERIAL: "SET_MATERIAL",
  SET_MATERIALS: "SET_MATERIALS",
  SET_DEFAULT_MATERIALS: "SET_DEFAULT_MATERIALS",
  SET_LOADING: "SET_LOADING",
  RESET_STATE: "RESET_STATE",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_MATERIAL:
      return Object.assign({}, state, { material: action.material });
    case actions.SET_MATERIALS:
      return Object.assign({}, state, { materials: action.materials });
    case actions.SET_DEFAULT_MATERIALS:
      return Object.assign({}, state, {
        defaultMaterials: action.defaultMaterials,
      });
    case actions.SET_LOADING:
      return Object.assign({}, state, { loading: action.loading });
    case actions.RESET_STATE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

type TMaterialContext = typeof initialState & {
  getMaterial: (materialId: any) => Promise<void>;
  getMaterialByRoomId: (roomId: any) => Promise<void>;
  getSetupMaterialsData: () => Promise<void>;
  getDefaultMaterialsData: () => Promise<void>;
  createMaterialForARoom: (roomId: any, payload: any) => Promise<void>;
  update: (payload: any, live?: boolean) => Promise<void>;
  setMaterial: (material: any) => void;
  setLoading: (loading: boolean) => void;
  resetState: () => void;
};

export const MaterialContext = createContext(
  initialState
) as Context<TMaterialContext>;

export const MaterialProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetState = () => {
    dispatch({ type: actions.RESET_STATE });
  };

  const setLoading = (loading: boolean) => {
    dispatch({
      type: actions.SET_LOADING,
      loading,
    });
  };

  const getMaterial = async (materialId) => {
    try {
      const material = await getOneMaterial(materialId);

      dispatch({
        type: actions.SET_MATERIAL,
        material,
      });
    } catch (error) {}
  };

  const getMaterialByRoomId = async (roomId) => {
    try {
      const material = await getRoomMaterial(roomId);

      dispatch({
        type: actions.SET_MATERIAL,
        material,
      });
    } catch (error) {}
  };

  const createMaterialForARoom = async (roomId, payload) => {
    try {
      setLoading(true);
      const material = await createRoomMaterial(roomId, payload);

      dispatch({
        type: actions.SET_MATERIAL,
        material,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSetupMaterialsData = async () => {
    try {
      const materials = await getSetupMaterials();

      dispatch({
        type: actions.SET_MATERIALS,
        materials,
      });
    } catch (error) {}
  };

  const getDefaultMaterialsData = async () => {
    try {
      const materials = await getDefaultMaterials();

      dispatch({
        type: actions.SET_DEFAULT_MATERIALS,
        defaultMaterials: materials,
      });
    } catch (error) {}
  };

  const update = async (payload, live = true) => {
    try {
      await updateMaterial(state.material.id, payload);

      if (live) {
        dispatch({
          type: actions.SET_MATERIAL,
          material: { ...state.material, ...payload },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const setMaterial = (material) => {
    dispatch({
      type: actions.SET_MATERIAL,
      material,
    });
  };

  const value = {
    ...state,
    getMaterial,
    getMaterialByRoomId,
    getSetupMaterialsData,
    getDefaultMaterialsData,
    createMaterialForARoom,
    update,
    setMaterial,
    setLoading,
    resetState,
  };

  return (
    <MaterialContext.Provider value={value}>
      {props.children}
    </MaterialContext.Provider>
  );
};
