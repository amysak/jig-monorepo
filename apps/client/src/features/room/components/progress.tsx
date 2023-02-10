import { blue, green, red } from "@ant-design/colors";
import { useMutation } from "@tanstack/react-query";
import { Progress, Steps } from "antd";
import { useState } from "react";
import { CompletionStatus, DeepPartial, Room } from "type-defs";
import { api } from "lib/api";

type RoomProgressProps =
  | {
      id?: number;
      type: "inline";
      status?: CompletionStatus;
    }
  | {
      id: number;
      type: "steps";
      status?: CompletionStatus;
    };

const percentToDescription = {
  0: "Cancelled",
  25: "Estimate",
  50: "Proposal",
  75: "Production",
  100: "Completed",
};

export const RoomProgress = ({ id, type, status }: RoomProgressProps) => {
  let percent: number;
  let strokeColor: string | string[];
  let initialCurrentStep: number;

  switch (status) {
    case "estimate":
      initialCurrentStep = 0;
      percent = 25;
      strokeColor = [blue[4]];
      break;
    case "proposal":
      initialCurrentStep = 1;
      percent = 50;
      strokeColor = [blue[4], blue[4]];
      break;
    case "production":
      initialCurrentStep = 2;
      percent = 75;
      strokeColor = [blue[4], blue[4], blue[4]];
      break;
    case "completed":
      initialCurrentStep = 3;
      percent = 100;
      strokeColor = [green[6], green[6], green[6], green[6]];
      break;
    case "cancelled":
      // TODO: logic should be generic to cancel the task on a specific step
      initialCurrentStep = 3;
      percent = 25;
      strokeColor = [red[4]];
      break;
    default:
      initialCurrentStep = 0;
      percent = 0;
      strokeColor = [];
      break;
  }

  const [currentStep, setCurrentStep] = useState(initialCurrentStep);

  const { mutateAsync: updateRoom } = useMutation({
    mutationKey: ["rooms", id],
    mutationFn: ({ id, data }: { id: number; data: DeepPartial<Room> }) =>
      api.rooms.updateById(id, data),
  });

  return type === "inline" ? (
    <Progress
      percent={percent}
      steps={4}
      strokeColor={strokeColor}
      format={(percent) => percent && percentToDescription[percent]}
    />
  ) : (
    <Steps
      direction="vertical"
      size="small"
      current={currentStep}
      onChange={async (selected) => {
        let newStatus: CompletionStatus;
        switch (selected) {
          case 0:
            newStatus = "estimate";
            break;
          case 1:
            newStatus = "proposal";
            break;
          case 2:
            newStatus = "production";
            break;
          case 3:
            newStatus = "completed";
            break;
          default:
            newStatus = "estimate";
            break;
        }

        setCurrentStep(selected);
        await updateRoom({ id, data: { status: newStatus } });
      }}
      status={status === "cancelled" ? "error" : undefined}
      items={[
        {
          title: "Estimate",
          description: "Room is currently under estimation progress.",
        },
        {
          title: "Proposal",
          description: "A proposal has been offered to a customer.",
        },
        {
          title: "Production",
          description: "Job is currently under production.",
        },
        {
          title: "Completed",
          description: "Job has been completed!",
          status: currentStep === 3 ? "finish" : "wait",
        },
      ]}
    />
  );
};
