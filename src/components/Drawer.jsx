import { Button, Drawer, theme } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import Menu from "./Menu";
import ThemeButton from "./ThemeButton";

const CustomDrawer = ({
  setDrawerVisible,
  drawerVisible,
  toggleTheme,
  darkTheme,
}) => {
  const {
    token: { colorBgBase, colorTextBase, colorIcon, colorBorderSecondary },
  } = theme.useToken();

  const footerHeight = 64; // reserve space for ThemeButton

  return (
    <>
      {/* Drawer Toggle Button */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1000,
          color: colorIcon,
        }}
      />

      {/* Drawer */}
      <Drawer
        title={<Logo collapsed={false} />}
        placement="left"
        closable
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closeIcon={<CloseOutlined style={{ color: colorIcon }} />}
        styles={{
          body: {
            padding: 0,
            background: colorBgBase,
            color: colorTextBase,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRight: "1px solid " + colorBorderSecondary,
          },
          header: {
            background: colorBgBase,
            color: colorTextBase,
            borderBottom: "none",
            borderRight: "1px solid " + colorBorderSecondary,
          },
        }}
      >
        {/* Scrollable Menu area */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            minHeight: 0,
            paddingBottom: footerHeight,
          }}
        >
          <Menu setDrawerVisible={setDrawerVisible} />
        </div>

        {/* Footer with Theme Button */}
        <div
          style={{
            flex: "0 0 auto",
            borderTop: "1px solid " + colorBorderSecondary,
            padding: 12,
            background: colorBgBase,
          }}
        >
          <ThemeButton toggleTheme={toggleTheme} darkTheme={darkTheme} />
        </div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
