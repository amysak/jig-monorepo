import React, { Context, createContext, useReducer } from "react";

const initialState = {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const reducer = () => {};

type TRoomContext = typeof initialState & {
  dispatch: React.DispatchWithoutAction;
};

const RoomContext = createContext(initialState) as Context<TRoomContext>;

export const RoomProvider = (props: { children: any }) => {
  // @ts-expect-error TS(2769): No overload matches this call.
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
    ...state,
    dispatch,
  };

  return (
    <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>
  );
};
