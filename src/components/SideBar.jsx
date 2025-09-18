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

  const footerHeight = 64;

  return (
    <Sider
      collapsed={collapsed}
      trigger={null}
      collapsible
      breakpoint="lg"
      width={225}
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
        display: isMobile ? "none" : "flex",
        flexDirection: "column",
        background: colorBgBase,
        color: colorTextBase,
        borderRight: "1px solid " + colorBorderSecondary,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
        <div style={{ flex: "0 0 auto" }}>
          <Logo collapsed={collapsed} />
        </div>

        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            minHeight: 0,
            paddingBottom: footerHeight,
          }}
        >
          <Menu />
        </div>

        <div
          style={{
            flex: "0 0 auto",
            borderTop: "1px solid " + colorBorderSecondary,
            padding: 12,
            background: colorBgBase,
          }}
        >
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
