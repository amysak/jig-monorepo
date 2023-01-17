import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { isNil } from "lodash";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Empty,
  EmptyProps,
  Popover,
  PRESENTED_IMAGE_SIMPLE,
  Row,
  Skeleton,
  Table,
} from "@jigbid/ui";
import { Job } from "entities";
import { IUseModal, useModal } from "hooks/useModal";

import { columns } from "../utils/shared";
import { JobList } from "./JobList";

import { useAppDispatch, useAppState } from "../../../store";
import { selectEPJobs, selectEPRooms } from "../model/selectors";
import { getInfoThunk } from "../model/thunk";

import "./JobsRoomSelect.styles.scss";

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const JobName = ({ job }: { job: Job }) => {
  return (
    <>
      {!isNil(job) ? (
        <div>
          <Link to={`/jobs/${job.id}`}>
            {job.name}
            <LinkOutlined style={{ marginLeft: 10 }} />
          </Link>
        </div>
      ) : (
        <Skeleton paragraph={false} />
      )}
    </>
  );
};

const EmptyTable = (props: EmptyProps) => {
  return <Empty className="empty-table" {...props} />;
};

interface JobsRoomSelectProps {
  setSelectedJob: (data: Job) => void;
  selectedJob: Job;
}

export const JobsRoomSelect: FC<JobsRoomSelectProps> = ({
  selectedJob,
  setSelectedJob,
}) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const jobs = useAppState(selectEPJobs);
  const rooms = useAppState(selectEPRooms);

  const getJobRoomsData = useCallback(
    (_userName: string) => {
      //@ts-ignore
      dispatch(getInfoThunk(_userName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isNil(selectedJob)) {
      getJobRoomsData(selectedJob.id.toString());
    }
  }, [getJobRoomsData, selectedJob]);

  const { isModalOpen, showModal, handleSet } = useModal();

  const dataSource = useMemo(() => {
    return selectedJob && !rooms.isLoading ? rooms?.data?.[0] : [];
  }, [rooms?.data, rooms.isLoading, selectedJob]);

  return (
    <Card size="default" style={{ minHeight: "100%" }}>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <JobsModal
            setSelectedJob={setSelectedJob}
            handleSet={handleSet}
            showModal={showModal}
            isModalOpen={isModalOpen}
          />
        </Col>

        <Col xs={24}>
          <div>
            <JobName job={jobs.data} />
          </div>
        </Col>

        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            className="jobs-room-select-table"
            locale={{
              emptyText: !selectedJob ? (
                <EmptyTable
                  image={
                    <div className="table-unselected-icon">
                      <SearchOutlined />
                    </div>
                  }
                  description="Select a Job"
                />
              ) : (
                <EmptyTable image={PRESENTED_IMAGE_SIMPLE} />
              ),
            }}
            pagination={false}
            size="small"
            loading={rooms.isLoading}
            rowSelection={{ ...rowSelection }}
          />
        </Col>
      </Row>
    </Card>
  );
};

interface JobsModalProps
  extends Pick<ReturnType<IUseModal>, "isModalOpen" | "showModal"> {
  setSelectedJob: (data: Job) => void;
  handleSet: (bool: boolean) => void;
}

const JobsModal: FC<JobsModalProps> = ({
  setSelectedJob,
  showModal,
  isModalOpen,
  handleSet,
}) => {
  return (
    <Popover
      content={<JobList onSelect={setSelectedJob} onOpenChange={handleSet} />}
      trigger="click"
      placement="rightTop"
      open={isModalOpen}
      onOpenChange={handleSet}
    >
      <Row justify="space-between">
        <Col xs={24} className="jobs-modal-col">
          <Button
            block
            onClick={showModal}
            className="jobs-modal-button"
            type="primary"
          >
            Select a Job
          </Button>
        </Col>
      </Row>
    </Popover>
  );
};
