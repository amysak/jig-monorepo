import { Col, Row, Tabs } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import pluralize from "pluralize";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getClients } from "api/clients";
import { getJobs } from "api/jobs";
import { Card } from "@jigbid/ui";
import { DashboardLines } from "features/DashboardLine";

import FallbackUI from "../../components/organisms/fallbackui";
import UILayout from "../../components/templates/uilayout";

import "./dashboard.scss";
// TODO: move to single source of truth
dayjs.extend(relativeTime);

interface ActivityCardProps {
  entries: any;
  loading: boolean;
  label: string;
}

// const { Text } = Typography
const { TabPane } = Tabs;

function ActivityCard({ entries, label }: ActivityCardProps) {
  return (
    <>
      {entries.map(
        (
          entry: {
            id: number;
            name: string;
            updated_at: string;
            jobs: any;
            client: { name: any };
          },
          index
        ) => (
          <div className="activityCard__activity" key={`${index}`}>
            <div className="activityCard__activity-row">
              <span className="activityCard__activity-row-title">
                <Link to={`/${label.toLowerCase()}/${entry.id}`}>
                  {entry.name}
                </Link>
              </span>

              <span>{dayjs().to(dayjs(entry.updated_at))}</span>
            </div>

            <div className="activityCard__activity-row">
              <span className="activityCard__activity-row-meta">
                {entry.jobs
                  ? `${entry.jobs} ${pluralize("job", 1)}`
                  : entry.client?.name}
              </span>
            </div>
          </div>
        )
      )}
    </>
  );
}

const NUMBER_TO_GET = 10;

function Dashboard() {
  const {
    data: clientsData,
    isLoading: clientsLoading,
    error: clientsError,
  } = useQuery(["clients", NUMBER_TO_GET], () =>
    getClients(`limit=${NUMBER_TO_GET}`)
  );

  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery(["jobs", NUMBER_TO_GET], () =>
    getJobs(`limit=${NUMBER_TO_GET}`)
  );

  if (clientsError || jobsError) {
    // TODO: create error boundary and throw
    return <div>Error</div>;
  }

  const loading = clientsLoading || jobsLoading;

  if (loading) {
    return <FallbackUI />;
  }

  return (
    <UILayout className="dashboardlayout">
      <div className="dashboardWrapper">
        <Row gutter={[20, 0]}>
          <Col xs={24} xxl={18} className="dashboardWrapper__canvas">
            <DashboardLines />
          </Col>

          <Col xs={24} xxl={6}>
            <Card size="default" className="card-tabs card">
              <Tabs defaultActiveKey="clients">
                <TabPane tab="Clients" key="clients">
                  <ActivityCard
                    entries={clientsData?.clients}
                    loading={loading}
                    label="Clients"
                  />
                </TabPane>
                <TabPane tab="Jobs" key="jobs">
                  <ActivityCard
                    entries={jobsData?.jobs}
                    loading={loading}
                    label="Jobs"
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </UILayout>
  );
}

export default Dashboard;
