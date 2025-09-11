import { Layout } from "antd";

const { Content } = Layout;

const ContentWrapper = ({ collapsed, isMobile, children }) => {
  const siderWidth = collapsed ? 80 : 200;
  return (
    <Content
      style={{
        marginLeft: isMobile ? 0 : siderWidth,
        transition: "margin-left 0.3s ease",
        minHeight: "100vh",
      }}
    >
      {children}
    </Content>
  );
};

export default ContentWrapper;
