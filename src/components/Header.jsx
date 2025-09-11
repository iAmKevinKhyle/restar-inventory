import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Flex, theme } from "antd";
import AvatarPanel from "./AvatarPanel";

const { Header } = Layout;

const CustomHeader = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  return (
    <Header style={{ padding: '1rem', background: colorBgBase, color: colorTextBase }}>
      <Flex justify="space-between">
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
        />

        <AvatarPanel name="John Doe" role="Admin" />
      </Flex>
    </Header>
  );
};

export default CustomHeader;
