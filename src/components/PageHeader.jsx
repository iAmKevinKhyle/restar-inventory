import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  } 

  return (
    <div className="flex items-center gap-4 mb-6">
      {showBack && (
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackButton}
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
