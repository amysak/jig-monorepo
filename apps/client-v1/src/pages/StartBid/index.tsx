import { Button, Col, Row, Steps } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import SetupModal from "../../components/atoms/setupmodal";
import PickOrSelectClient from "./PickOrSelectClient";
import SetupClientTabs from "./SetupClientTabs";
import SetupJobTabs from "./SetupJobTabs";

import { createJob, selectJob } from "features/job";
import { useAppDispatch, useAppState } from "store/index";
import { ClientsContext } from "../../store/clients";
import SetupRoomTabs from "./SetupRoom";
import "./styles.scss";

const { Step } = Steps;

export default function SetupNewBid() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = React.useState(0);
  const clientCtx = useContext(ClientsContext);
  const { data: job } = useAppState(selectJob);

  const onPrevious = () => setStep(Math.abs(step - 1));

  const createNewJob = () => {
    dispatch(
      createJob({
        client: clientCtx.client?.id,

        name: `New Job name for ${clientCtx.client?.name}`,
      })
    );
  };

  const onContinue = () => {
    if (job?.id) {
      navigate(`/jobs/${job.id}/rooms`);
    }
  };

  const components = [
    {
      Component: PickOrSelectClient,

      isValid: !isEmpty(clientCtx.client) && clientCtx.client?.id,
    },
    {
      Component: SetupClientTabs,
      isValid: true,
      onNext: createNewJob,
    },
    {
      Component: SetupJobTabs,

      isValid: !isEmpty(job) && job?.id,
    },
    {
      Component: SetupRoomTabs,
      isValid: true,
    },
  ];
  const currentComponentObject = components[step];
  const CurrentComponent = currentComponentObject.Component;
  const steps = components.length;

  const onNext = () => {
    if (currentComponentObject.onNext) {
      currentComponentObject.onNext();
    }

    setStep(step + 1);
  };

  React.useEffect(() => {
    const query = `limit=10000&select=client.id,client.name,client.updated_at`;

    clientCtx.onGetClients(query);
  }, []);

  return (
    <SetupModal
      header={
        <Row>
          <Steps current={step} className="setup-bid-steps">
            <Step
              title="Pick a Client"
              description="Create or select an existing client."
            />
            <Step
              title="Confirm Client"
              description="Verify/update Client information."
            />
            <Step
              title="Job"
              subTitle=""
              description="Create a new Job or select existing Job."
            />
            <Step title="Room" description="Create a Room" />
          </Steps>
        </Row>
      }
    >
      <Col span={24} style={{ marginTop: "50px" }}>
        <Row justify="center">
          <Col xs={24} xl={18} xxl={16}>
            <Row justify="space-between" className="setupnewbid">
              <CurrentComponent onNext={onNext} />
            </Row>
          </Col>

          <Col xs={24} xl={18} xxl={16}>
            <Row justify="space-between" className="next-prev-btns">
              <Button
                size="small"
                disabled={step <= 0}
                onClick={onPrevious}
                className="jig-button"
              >
                Previous
              </Button>

              {step < steps - 2 ? (
                <Button
                  size="small"
                  disabled={!currentComponentObject.isValid}
                  onClick={onNext}
                  className="jig-button"
                >
                  Next
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={onContinue}
                  className="jig-button"
                >
                  Continue
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </SetupModal>
  );
}
