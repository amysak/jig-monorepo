import React, {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";
import {
  createRoomCabinet,
  deleteCabinetSetup,
  getCabinetByRoom,
  getOneCabinet,
  updateCabinet,
} from "../api/cabinets";

interface IInitialState {
  cabinets: [Array<unknown>, number];
  cabinet: {
    id?: string;
    number_of_drawers_boxes?: string;
    number_of_rollout_trays?: string;
    cabinet_depth?: string;
    tray_part?: unknown[];
    drawer_part?: unknown[];
    number_of_opennings?: number;
    number_of_drawer_fronts?: number;
    category?: string;
    name?: string;
  };
}

const initialState: IInitialState = {
  cabinets: [[], 0],
  cabinet: {},
};

const actions = {
  GET_ROOM_CABINETS: "GET_ROOM_CABINETS",
  GET_ONE_CABINET: "GET_ONE_CABINET",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ROOM_CABINETS:
      return { ...state, cabinets: action.cabinets };
    case actions.GET_ONE_CABINET:
      return { ...state, cabinet: action.cabinet };
    default:
      return state;
  }
};

type TCabinetContext = typeof initialState & {
  dispatch: Dispatch<unknown>;
  onGetRoomCabinets: (roomId: unknown, query: string) => Promise<void>;
  onDeleteCabinet: (cabinetId: unknown) => Promise<void>;
  onCreateRoomCabinets: (cabinetId: unknown, payload: unknown) => Promise<void>;
  onCellChange: (
    name: unknown,
    row: {
      id: unknown;
    }
  ) => (value: unknown) => Promise<void>;
  onGetCabinet: (cabinetId: unknown) => Promise<void>;
  onUpdateCabinet: (
    cabinetId: unknown,
    payload: {
      [x: number]: unknown;
    },
    live?: boolean
  ) => Promise<void>;
};

export const CabinetContext = createContext(
  initialState
) as Context<TCabinetContext>;

export const CabinetContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onGetRoomCabinets = async (roomId, query: string) => {
    try {
      const cabinets = await getCabinetByRoom(roomId, query);

      dispatch({
        type: actions.GET_ROOM_CABINETS,
        cabinets,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCabinet = async (cabinetId) => {
    try {
      await deleteCabinetSetup(cabinetId);

      const updatedCabinets = state.cabinets[0]?.filter(
        (cabinet: { id: unknown }) => cabinet.id !== cabinetId
      );

      dispatch({
        type: actions.GET_ROOM_CABINETS,
        cabinets: [updatedCabinets, updatedCabinets.length],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCreateRoomCabinets = async (cabinetId, payload) => {
    try {
      const newCabinet = await createRoomCabinet(cabinetId, payload);
      const cabinets = [newCabinet, ...state.cabinets?.[0]];

      dispatch({
        type: actions.GET_ROOM_CABINETS,
        cabinets: [cabinets, cabinets.length],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCellChange = (name, row: { id: unknown }) => {
    return async (value) => {
      try {
        await updateCabinet((row as { id: string }).id, {
          [name]: value,
        });

        const list = state.cabinets[0]?.map((cabinet: { id: unknown }) => {
          if (cabinet.id === row.id) {
            return { ...cabinet, [name]: value };
          }

          return cabinet;
        });

        dispatch({
          type: actions.GET_ROOM_CABINETS,
          cabinets: [list, list.length],
        });
      } catch (error) {
        console.error(error);
      }
    };
  };

  const onGetCabinet = async (cabinetId) => {
    try {
      const cabinet = await getOneCabinet(cabinetId);

      dispatch({
        type: actions.GET_ONE_CABINET,
        cabinet,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCabinet = async (
    cabinetId,
    payload: { [x: number]: unknown },
    live = true
  ) => {
    try {
      await updateCabinet(cabinetId, payload);

      if (live) {
        dispatch({
          type: actions.GET_ONE_CABINET,
          cabinet: { ...state.cabinet, ...payload },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = {
    ...state,
    dispatch,
    onGetRoomCabinets,
    onDeleteCabinet,
    onCreateRoomCabinets,
    onCellChange,
    onGetCabinet,
    onUpdateCabinet,
  };

  return (
    <CabinetContext.Provider value={value}>
      {props.children}
    </CabinetContext.Provider>
  );
};
