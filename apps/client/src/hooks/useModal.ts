import { Dispatch, useCallback, useState } from "react";

export interface IUseModal {
  (initialState?: boolean): {
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<boolean>;
    handleSet: (bool: boolean) => void;
  };
}

export const useModal: IUseModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSet = useCallback((bool: boolean) => {
    setIsModalOpen(bool);
  }, []);

  return {
    showModal,
    handleOk,
    handleCancel,
    isModalOpen,
    setIsModalOpen,
    handleSet,
  };
};