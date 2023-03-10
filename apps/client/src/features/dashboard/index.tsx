import { PageSkeleton, TabPane, Tabs } from "@jigbid/ui";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import { Client, Job } from "type-defs";

import { dayjs } from "lib/dayjs";
import { Fallback } from "layouts/fallback";
import { api } from "lib/api";
import { DashboardLines } from "./DashboardLine";

import "./dashboard.scss";

interface ActivityCardProps<T> {
  entries: T[] | undefined;
  urlGenerator: (entry: T) => string;
  loading: boolean;
  label: string;
}

const isJob = (value: any): value is Job => {
  return !!(value as Job).hasOwnProperty("estimateDate");
};

const ActivityCard = <T extends Job | Client>({
  urlGenerator,
  entries,
}: ActivityCardProps<T>) => {
  if (!entries || entries.length === 0) {
    return <PageSkeleton />;
  }

  return (
    <>
      {entries.map((entry, index) => (
        <div className="activityCard__activity" key={`${index}`}>
          <div className="activityCard__activity-row">
            <span className="activityCard__activity-row-title">
              <Link to={urlGenerator(entry) as any}>{entry.name}</Link>
            </span>

            <span>{dayjs().to(dayjs(entry.updatedAt))}</span>
          </div>

          <div className="activityCard__activity-row">
            <span className="activityCard__activity-row-meta">
              {isJob(entry)
                ? // TODO: client page

                  // <Link
                  //   to="/clients/$clientId"
                  //   params={{ clientId: entry.clientId }}
                  //   style={{ fontSize: "0.75rem" }}
                  // >
                  entry.client.name
                : // </Link>
                  `${entry.jobs?.length || 0} jobs`}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

const NUMBER_TO_GET = 10;

export const Dashboard = () => {
  const {
    data: clientsData,
    isLoading: clientsLoading,
    error: clientsError,
  } = useQuery(["clients", NUMBER_TO_GET], () =>
    api.clients.getAll({ pagination: { limit: NUMBER_TO_GET } })
  );

  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery(["jobs", NUMBER_TO_GET], () =>
    api.jobs.getAll({ pagination: { limit: NUMBER_TO_GET } })
  );

  if (clientsError || jobsError) {
    // TODO: create error boundary and throw
    return <div>Error</div>;
  }

  const loading = clientsLoading || jobsLoading;

  if (loading) {
    return <Fallback />;
  }

  return (
    <div className="dashboardWrapper">
      <Row gutter={[20, 0]}>
        <Col xs={24} xl={18} className="dashboardWrapper__canvas">
          <DashboardLines />
        </Col>

        <Col xs={24} xl={6}>
          <Card size="default" className="card-tabs card">
            <Tabs defaultActiveKey="clients">
              <TabPane tab="Clients" key="clients">
                <ActivityCard
                  entries={clientsData?.data}
                  urlGenerator={(client) => `/clients/${client.id}`}
                  loading={loading}
                  label="Clients"
                />
              </TabPane>
              <TabPane tab="Jobs" key="jobs">
                <ActivityCard
                  entries={jobsData?.data}
                  urlGenerator={(job) => `/jobs/${job.id}`}
                  loading={loading}
                  label="Jobs"
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
