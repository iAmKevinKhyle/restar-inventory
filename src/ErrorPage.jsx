// src/pages/ErrorPage.jsx
import { Result, Button, Card, theme } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div className="flex items-center justify-center min-h-[95vh]" style={{ background: colorBorderSecondary }}>
      <Card
        style={{
          maxWidth: 600,
          width: "100%",
          borderRadius: "16px",
          background: "transparent",
        }}
      >
        <Result
          status="500"
          title="Something went wrong"
          subTitle={
            message || "An unexpected error occurred. Please try again later."
          }
          extra={[
            <Button
              type="primary"
              key="dashboard"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>,
            <Button
              danger
              key="reload"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default ErrorPage;
