import React, { createContext, useState, Context } from "react";

type TDrawerContext = {
  collapsed: boolean;
  isManual: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
  onManualToggle: () => void;
};

const DrawerContext = createContext({
  visible: false,
  width: 200,
}) as unknown as Context<TDrawerContext>;

export function DrawerContextProvider(props: { children: any }) {
  const [collapsed, setCollapsed] = useState(true);
  const [isManual, setIsManual] = useState(false);

  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  const onManualToggle = () => {
    setIsManual(!isManual);
    onToggle();
  };

  const onOpen = () => {
    setCollapsed(true);
  };

  const onClose = () => {
    setCollapsed(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        collapsed,
        onToggle,
        onClose,
        onOpen,
        isManual,
        onManualToggle,
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  );
}

export default DrawerContext;
