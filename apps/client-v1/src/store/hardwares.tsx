import React, { Context, createContext, useReducer } from "react";
import {
  createRoomAccessory,
  deleteOneAccessory,
  getDefaultAccessories,
  getRoomAccessories,
} from "../api/accessories";
import {
  createRoomHardware,
  deleteAllRoomHardwares,
  getDefaultHardwares,
  getRoomHardware,
  getSetupHardware,
  updateRoomHardware,
} from "../api/hardwares";
import { hardwareClassifications } from "../utilities/constants";
import { getQueryString } from "../utilities/utils";

const initialState = {
  hardwares: [[], 0],
  accessories: [[], 0],
  hardware: {},
  defaultHardwares: [[], 0],
  defaultAccessories: [[], 0],
  loading: false,
  classifications: {},
};

const actions = {
  SET_HARDWARES: "SET_HARDWARES",
  SET_ACCESSORIES: "SET_ACCESSORIES",
  SET_HARDWARE: "SET_HARDWARE",
  SET_DEFAULT_HARDWARES: "SET_DEFAULT_HARDWARES",
  SET_DEFAULT_ACCESSORIES: "SET_DEFAULT_ACCESSORIES",
  SET_HARDWARE_CLASSIFICATIONS: "SET_HARDWARE_CLASSIFICATIONS",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_HARDWARES:
      return { ...state, hardwares: action.hardwares };
    case actions.SET_ACCESSORIES:
      return { ...state, accessories: action.accessories };
    case actions.SET_HARDWARE:
      return { ...state, hardware: action.hardware };
    case actions.SET_DEFAULT_HARDWARES:
      return { ...state, defaultHardwares: action.hardwares };
    case actions.SET_DEFAULT_ACCESSORIES:
      return { ...state, defaultAccessories: action.accessories };
    case actions.SET_HARDWARE_CLASSIFICATIONS:
      return {
        ...state,
        classifications: action.classifications,
      };
    default:
      return state;
  }
};

type THardwareContext = typeof initialState & {
  dispatch: React.Dispatch<any>;
  getMaterials: () => Promise<void>;
  onGetHardwareClassifications: () => Promise<void>;
  onGetRoomHardware: (roomId: any) => Promise<void>;
  onCreateRoomHardware: (payload: any) => Promise<void>;
  onDefaultAccessories: (query: string) => Promise<void>;
  onGetDefaultHardwares: (query: string) => Promise<void>;
  onDeleteAllRoomHardware: (roomId: any) => Promise<void>;
  onDeleteRoomSetupAccessory: (accessoryId: any) => Promise<void>;
  onRoomHardwareItemChange: (roomId: any, values: any) => Promise<void>;
  onGetRoomAccessorySetup: (roomId: any, query: string) => Promise<void>;
  onCreateRoomSetupAccessory: (payload: any, roomId: any) => Promise<void>;
};

export const HardwareContext = createContext(
  initialState
) as Context<THardwareContext>;

export const HardwareProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const getMaterials = async () => {};

  const onGetDefaultHardwares = async (query: string) => {
    try {
      const hardwares = await getDefaultHardwares(query);

      dispatch({
        type: actions.SET_DEFAULT_HARDWARES,
        hardwares,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDefaultAccessories = async (query: string) => {
    try {
      const accessories = await getDefaultAccessories(query);

      dispatch({
        type: actions.SET_DEFAULT_ACCESSORIES,
        accessories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateRoomHardware = async (payload) => {
    try {
      const hardware = await createRoomHardware(payload);

      dispatch({
        type: actions.SET_HARDWARE,
        hardware,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCreateRoomSetupAccessory = async (payload, roomId) => {
    try {
      const accessory = await createRoomAccessory({
        ...payload,
        id: undefined,
        room: roomId,
        is_default: false,
      });

      const newList = [...state.accessories?.[0], accessory];

      dispatch({
        type: actions.SET_ACCESSORIES,
        accessories: [newList, newList.length],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onDeleteRoomSetupAccessory = async (accessoryId) => {
    try {
      await deleteOneAccessory(accessoryId);

      const list = state.accessories[0].filter((access: { id: any }) => {
        return access.id !== accessoryId;
      });

      dispatch({
        type: actions.SET_ACCESSORIES,
        accessories: [list, list.length],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onGetRoomHardware = async (roomId) => {
    try {
      const hardware = await getRoomHardware(roomId);

      dispatch({
        type: actions.SET_HARDWARE,
        hardware,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onGetRoomAccessorySetup = async (roomId, query: string) => {
    try {
      const accessories = await getRoomAccessories(roomId, query);

      dispatch({
        type: actions.SET_ACCESSORIES,
        accessories,
      });
    } catch (error) {}
  };

  const onGetHardwareClassifications = async () => {
    try {
      const [
        doorAndDrawers,
        rolloutGuides,
        hinges,
        legs,
        suspensionBlocks,
        suspensionRails,
      ] = await Promise.all(
        hardwareClassifications.map((classification) => {
          const filter = {
            classification: classification.value,
            key: classification.key,
          };

          return getSetupHardware(getQueryString(filter));
        })
      );

      const classifications = {
        doorAndDrawers: doorAndDrawers[0],
        rolloutGuides: rolloutGuides[0],
        hinges: hinges[0],
        legs: legs[0],
        suspensionBlocks: suspensionBlocks[0],
        suspensionRails: suspensionRails[0],
      };

      dispatch({
        type: actions.SET_HARDWARE_CLASSIFICATIONS,
        classifications,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onRoomHardwareItemChange = async (roomId, values) => {
    try {
      await updateRoomHardware(roomId, values);

      dispatch({
        type: actions.SET_HARDWARE,
        hardware: { ...state.hardware, ...values },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteAllRoomHardware = async (roomId) => {
    try {
      await deleteAllRoomHardwares(roomId);

      dispatch({
        type: actions.SET_HARDWARE,
        hardware: {},
      });

      dispatch({
        type: actions.SET_ACCESSORIES,
        accessories: [[], 0],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = {
    ...state,
    dispatch,
    getMaterials,
    onGetRoomHardware,
    onDefaultAccessories,
    onCreateRoomHardware,
    onGetDefaultHardwares,
    onDeleteAllRoomHardware,
    onGetRoomAccessorySetup,
    onRoomHardwareItemChange,
    onCreateRoomSetupAccessory,
    onDeleteRoomSetupAccessory,
    onGetHardwareClassifications,
  };

  return (
    <HardwareContext.Provider value={value}>
      {props.children}
    </HardwareContext.Provider>
  );
};
