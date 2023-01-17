import React, { Context, createContext, Dispatch, useReducer } from "react";
import {
  addMaterialToDoor,
  getOneDoorDrawer,
  removeMaterialFromDoor,
  updateOne,
} from "../api/doors";

const initialState = {
  doors: [[], 0],
  door: null,
};

const actions = {
  GET_ALL_DOORS: "GET_ALL_DOORS",
  GET_ONE_DOOR: "GET_ONE_DOOR",
  UPDATE_DOOR: "UPDATE_DOOR",
  UPDATE_DOOR_MATERIALS: "UPDATE_DOOR_MATERIALS",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_DOORS:
      // @ts-expect-error TS(2339): Property 'doors' does not exist on type '{ GET_ALL... Remove this comment to see the full error message
      return { ...state, doors: actions.doors };
    case actions.GET_ONE_DOOR:
      return { ...state, door: action.door };
    case actions.UPDATE_DOOR:
      return { ...state.door, ...action.patch };
    case actions.UPDATE_DOOR_MATERIALS:
      return {
        ...state,
        door: {
          ...state.door,
          materials: [...action.materials],
        },
      };
    default:
      return state;
  }
};

type TDoorContext = typeof initialState & {
  dispatch: Dispatch<any>;
  getOneDoor: (doorId: any) => Promise<void>;
  onChange: (
    doorId: any,
    payload: {
      [x: number]: any;
    }
  ) => Promise<void>;
  onRemoveDoorMaterial: (doorId: any, materialId: any) => Promise<void>;
  onAddMaterialToDoor: (doorId: any, payload: any) => Promise<void>;
};

export const DoorContext = createContext(initialState) as Context<TDoorContext>;

export const DoorContextProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getOneDoor = async (doorId) => {
    try {
      if (!doorId) return;

      const door = await getOneDoorDrawer(doorId);

      dispatch({
        type: actions.GET_ONE_DOOR,
        door,
      });
    } catch (error) {
      console.log("failed to get door");
    }
  };

  const onChange = async (doorId, payload: { [x: number]: any }) => {
    try {
      await updateOne(doorId, payload);
    } catch (error) {
      console.log(error);
      console.log("failed to update door");
    }
  };

  const onAddMaterialToDoor = async (doorId, payload) => {
    try {
      const material = await addMaterialToDoor(doorId, payload);
      const materials = [material, ...state.door.materials];

      dispatch({
        type: actions.UPDATE_DOOR_MATERIALS,
        materials,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveDoorMaterial = async (doorId, materialId) => {
    try {
      await removeMaterialFromDoor(doorId, materialId);

      const materials = state.door.materials.filter((material: { id: any }) => {
        return material.id !== materialId;
      });

      dispatch({
        type: actions.UPDATE_DOOR_MATERIALS,
        materials,
      });
    } catch (error) {
      console.log(error);
      console.log("unable to remove material from door");
    }
  };

  const value = {
    ...state,
    dispatch,
    getOneDoor,
    onChange,
    onRemoveDoorMaterial,
    onAddMaterialToDoor,
  };

  return (
    <DoorContext.Provider value={value}>{props.children}</DoorContext.Provider>
  );
};
