import { Space } from "antd";

import { RoomMaterials, RoomSummary } from "features/room";
import { useQueryRoom } from "hooks/queries";
import { useMatch } from "hooks/router";
import { UILayout } from "layouts/ui";
import { roomActions } from "lib/store";

const RoomPage = () => {
  const {
    params: { id },
  } = useMatch();

  const { data: room } = useQueryRoom(id, {
    onSettled: (data) => data && roomActions.setRoom(data),
  });

  return (
    <UILayout title={room?.name}>
      <Space>
        <RoomSummary />
        <RoomMaterials />
      </Space>
    </UILayout>
  );
};

// TODO: do we need this component?
export default RoomPage;
