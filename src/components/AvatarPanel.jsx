import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Space, Button } from "antd";

const AvatarPanel = ({name, role}) => {
  return (
    <Space direction="vertical" size={16} className="leading-none">
      <Space wrap size={16}>
        <Avatar shape="square" size="large" icon={<UserOutlined />} />

        <span className="flex flex-col text-sm">
          <span>{name}</span>
          <span className="opacity-50">{role}</span>
        </span>

        <Button type="primary" icon={<LogoutOutlined />} size='large' />
      </Space>
    </Space>
  );
};

export default AvatarPanel;
