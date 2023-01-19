import { useNavigate } from "@tanstack/react-location";
import { message } from "antd";
import { useEffect, useRef } from "react";

import { UILayout } from "components/layout";

import "./cabinet-setup.scss";

export const CabinetSetupHome = () => {
  const timeout = useRef<NodeJS.Timeout>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!timeout.current) {
      message.info("You are being redirected to the cabinets page");
    }

    timeout.current = setTimeout(() => {
      navigate({ to: "cabinets", replace: true });
    }, 3000);

    return () => clearTimeout(timeout.current);
  });

  return (
    <UILayout>
      Fancy cabinet setup home with icons and interactive cards for each of the
      underlying components
    </UILayout>
  );
};

export default CabinetSetupHome;
