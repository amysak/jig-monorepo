import React, { Context, createContext, useReducer } from "react";
import {
  createPanel,
  deletePanel,
  getRoomPanels,
  updatePanel,
} from "../api/panels";

const initialState = {
  panels: [[], 0],
};

const actions = {
  GET_ROOM_PANELS: "GET_ROOM_PANELS",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ROOM_PANELS:
      return { ...state, panels: action.panels };
    default:
      return state;
  }
};

type TPanelContext = typeof initialState & {
  dispatch: React.Dispatch<any>;
  onGetRoomPanels: (roomId: any, query: string) => Promise<void>;
  onDeletePanel: (panelId: any) => Promise<void>;
  onCreateRoomPanel: (panel: any, roomId: any) => Promise<void>;
  onCellChange: (
    name: any,
    row: {
      id: any;
    }
  ) => (value: any) => Promise<void>;
};

export const PanelContext = createContext(
  initialState
) as Context<TPanelContext>;

export const PanelContextProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onGetRoomPanels = async (roomId, query: string) => {
    try {
      const panels = await getRoomPanels(roomId, query);

      dispatch({
        type: actions.GET_ROOM_PANELS,
        panels,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeletePanel = async (panelId) => {
    try {
      await deletePanel(panelId);

      const updatedPanels = state.panels[0]?.filter(
        (panel: { id: any }) => panel.id !== panelId
      );

      dispatch({
        type: actions.GET_ROOM_PANELS,
        panels: [updatedPanels, updatedPanels.length],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCreateRoomPanel = async (panel, roomId) => {
    try {
      const payload = {
        ...panel,
        room: roomId,
        id: undefined,
        is_default: false,
      };
      const newPanel = await createPanel(payload);
      const panels = [newPanel, ...state.panels?.[0]];

      dispatch({
        type: actions.GET_ROOM_PANELS,
        panels: [panels, panels.length],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCellChange = (name, row: { id: any }) => {
    return async (value) => {
      try {
        await updatePanel(row.id, { [name]: value });

        const list = state.panels[0]?.map((panel: { id: any }) => {
          if (panel.id === row.id) {
            return { ...panel, [name]: value };
          }

          return panel;
        });

        dispatch({
          type: actions.GET_ROOM_PANELS,
          panels: [list, list.length],
        });
      } catch (error) {
        console.error(error);
      }
    };
  };

  const value = {
    ...state,
    dispatch,
    onGetRoomPanels,
    onDeletePanel,
    onCreateRoomPanel,
    onCellChange,
  };

  return (
    <PanelContext.Provider value={value}>
      {props.children}
    </PanelContext.Provider>
  );
};
