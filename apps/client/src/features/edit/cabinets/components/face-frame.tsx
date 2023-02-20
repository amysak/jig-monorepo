import Icon, {
  DeleteOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { subscribe } from "valtio";

import DoorIcon from "assets/images/setup/door.svg";
import DrawerIcon from "assets/images/setup/drawer.svg";
import { api } from "lib/api";
import { debounce } from "lodash-es";
import { Cabinet } from "type-defs";

const { Paragraph, Text } = Typography;

export const CabinetFaceFrame = () => {
  const form = Form.useFormInstance();

  return (
    <Card>
      <Paragraph>Add a face frame for this cabinet</Paragraph>
    </Card>
  );
};
