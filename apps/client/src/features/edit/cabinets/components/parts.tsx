import { Card, Form, Typography } from "antd";
import { ReactNode } from "react";
import { Cabinet } from "type-defs";

const { Text, Paragraph } = Typography;

export const CabinetParts = ({
  filter,
}: {
  filter?: "interior" | "exterior";
}) => {
  const exteriorParts = (
    <>
      {/* <Paragraph>
        Base door count: <Text strong>{partCounts.baseDoors}</Text>
      </Paragraph>
      <Paragraph>
        Upper door count: <Text strong>{partCounts.upperDoors}</Text>
      </Paragraph>
      <Paragraph>
        Drawer fronts count: <Text strong>{partCounts.drawerFronts}</Text>
      </Paragraph> */}
    </>
  );

  const interiorParts = (
    <>
      {/* <Paragraph>
        Drawer boxes count: <Text strong>{partCounts.drawers}</Text>
      </Paragraph>
      <Paragraph>
        Trays count: <Text strong>{partCounts.trays}</Text>
      </Paragraph> */}
    </>
  );

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
