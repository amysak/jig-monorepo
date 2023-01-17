import { Modal, Button } from "antd";
import { FormInput } from "components/form";
import { useState } from "react";

interface ConditionsProps {
  name: string | string[];
  title: string;
}

export const Conditions = ({ name, title }: ConditionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prevOpen) => !prevOpen);

  return (
    <>
      <Button size="small" className="jig-button" onClick={toggleIsOpen}>
        {title}
      </Button>
      <Modal open={isOpen} onCancel={toggleIsOpen} footer={null} title={title}>
        <FormInput
          textarea={{ rows: 3 }}
          name={name}
          inputStyle={{ height: 150 }}
        />
      </Modal>
    </>
  );
};
