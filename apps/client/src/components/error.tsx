import { red } from "@ant-design/colors";
import { Typography } from "antd";

type ErrorComponentProps = {
  error: { message: string; stack?: string };
};

const { Text, Paragraph } = Typography;

export function ErrorBoundary({ error }: ErrorComponentProps) {
  const isDev = import.meta.env.DEV;

  return isDev ? (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paragraph>
        Encountered error: <Text color={red[6]}>{error.message}</Text>
      </Paragraph>
      <Paragraph>
        Error stack:
        <br />
        <code style={{ whiteSpace: "pre-line" }}>{error.stack}</code>
      </Paragraph>
    </div>
  ) : null; // TODO: production error page
}
