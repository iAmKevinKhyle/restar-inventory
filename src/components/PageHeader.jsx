import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-6">
      {showBack && (
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          Back
        </Button>
      )}

      <h1 className="text-2xl font-bold m-0">{title}</h1>
    </div>
  );
};

export default PageHeader;
