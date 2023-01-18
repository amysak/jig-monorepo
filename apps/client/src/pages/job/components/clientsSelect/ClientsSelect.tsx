import { Button } from "antd";
import { FC } from "react";

import { Popover } from "@jigbid/ui";
import { Client } from "type-defs";

import { ClientsList } from "./ClientsList";

import "./ClientsSelect.styles.scss";

interface ClientsSelectProps {
  updateJobsClient: (data: Client) => void;
  selectedClient: Client;
}

export const ClientsSelect: FC<ClientsSelectProps> = ({}) => {
  return (
    <ClientsModal
      setSelectedJob={() => ({})}
      toggleModal={() => ({})}
      isModalOpen={false}
    />
  );
};

interface ClientsModalProps {
  isModalOpen: boolean;
  setSelectedJob: (data: Client) => void;
  toggleModal: (bool: boolean) => void;
}

export const ClientsModal: FC<ClientsModalProps> = ({
  setSelectedJob,
  isModalOpen,
  toggleModal,
}) => {
  return (
    <Popover
      content={
        <ClientsList onSelect={setSelectedJob} onOpenChange={toggleModal} />
      }
      trigger="click"
      placement="rightTop"
      open={isModalOpen}
      onOpenChange={toggleModal}
    >
      <Button
        className="jig-button"
        size="small"
        block
        onClick={() => toggleModal(true)}
      >
        Change Client
      </Button>
    </Popover>
  );
};
