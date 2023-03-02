import { Card, Typography } from "antd";
import { countBy, flatMapDeep } from "lodash-es";
import { cabinetRoute } from "pages/setup";
import { ReactNode } from "react";

import { useCabinetState } from "../hooks";

const { Text, Paragraph } = Typography;

export const CabinetCharacteristics = ({
  filter,
}: {
  filter?: "interior" | "exterior";
}) => {
  const {
    snapshot: {
      cabinet: {
        realHeight,
        exterior: { equipmentRows },
        openings: { drawers, trays },
      },
    },
  } = useCabinetState();

  const counts = countBy(
    flatMapDeep(equipmentRows, (part) => part.items),
    (part) => part.type
  );

  const exteriorParts = (
    <>
      <Paragraph>
        Cabinet height: <Text strong>{realHeight || 0}</Text>
      </Paragraph>
      <Paragraph>
        Base door count: <Text strong>{counts.baseDoor || 0}</Text>
      </Paragraph>
      <Paragraph>
        Upper door count: <Text strong>{counts.upperDoor || 0}</Text>
      </Paragraph>
      <Paragraph>
        Drawer fronts count: <Text strong>{counts.drawer || 0}</Text>
      </Paragraph>
      <Paragraph>
        Drawer boxes count: <Text strong>{drawers.length || 0}</Text>
      </Paragraph>
      <Paragraph>
        Trays count: <Text strong>{trays.length || 0}</Text>
      </Paragraph>
    </>
  );

  const interiorParts = <></>;

  let content: ReactNode;
  if (filter === "exterior") {
    content = exteriorParts;
  } else if (filter === "interior") {
    content = interiorParts;
  } else {
    content = (
      <>
        {exteriorParts}
        {interiorParts}
      </>
    );
  }

  return <Card style={{ textAlign: "right" }}>{content}</Card>;
};
