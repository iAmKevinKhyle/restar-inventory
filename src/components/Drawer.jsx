import { Button, Drawer, theme } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import Menu from "./Menu";
import ThemeButton from "./ThemeButton";

const CustomDrawer = ({
  setDrawerVisible,
  drawerVisible,
  toggleTheme,
  darkTheme
}) => {
  const {
    token: { colorBgBase, colorTextBase, colorIcon },
  } = theme.useToken();

  return (
    <>
      {/* Drawer Toggle Button */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ position: "absolute", top: 16, left: 16, zIndex: 1000, color: colorIcon }}
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
          },
          header: {
            background: colorBgBase,
            color: colorTextBase,
            borderBottom: "none",
          },
        }}
      >
        <Menu setDrawerVisible={setDrawerVisible} />
        <ThemeButton toggleTheme={toggleTheme} darkTheme={darkTheme} />
      </Drawer>
    </>
  );
};

export default CustomDrawer;