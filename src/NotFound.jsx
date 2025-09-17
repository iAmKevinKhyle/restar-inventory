// src/pages/NotFound.jsx
import { Result, Button, Card, theme } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div
      className="flex items-center justify-center min-h-[95vh]"
      style={{ background: colorBorderSecondary }}
    >
      <Card
        style={{
          maxWidth: 600,
          width: "100%",
          borderRadius: "16px",
          background: "transparent"
        }}
      >
        <Result
          status="404"
          title="404 Not Found"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          }
        />
      </Card>
    </div>
  );
};

export default NotFound;
