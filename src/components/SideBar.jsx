import { Layout, theme } from "antd";
import Logo from "./Logo";
import Menu from "./Menu";
import ThemeButton from "./ThemeButton";

const { Sider } = Layout;

const SideBar = ({
  collapsed,
  setIsMobile,
  setCollapsed,
  isMobile,
  toggleTheme,
  darkTheme,
}) => {
  const {
    token: { colorBgBase, colorTextBase, colorBorderSecondary },
  } = theme.useToken();

  return (
    <Sider
      collapsed={collapsed}
      trigger={null}
      collapsible
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      onBreakpoint={(broken) => {
        setIsMobile(broken);
        setCollapsed(broken);
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0, 
        height: "100vh",
        zIndex: 1000,
        display: isMobile ? "none" : "block",
        background: colorBgBase,
        color: colorTextBase,
        borderRight: "1px solid " + colorBorderSecondary,
      }}
    >
      <Logo collapsed={collapsed} />
      <Menu />
      <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
    </Sider>
  );
};

export default SideBar;
