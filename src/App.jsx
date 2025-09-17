import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout, theme } from "antd";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import CustomDrawer from "./components/Drawer";
import Dashboard from "./pages/Dashboard/";
import Products from "./pages/Products/";
import Categories from "./pages/Categories/";
import StocksPage from "./pages/Stocks/";
import Invoice from "./pages/Invoice/";
import Delivery from "./pages/Delivery/";
import ContentWrapper from "./components/ContentWrapper";
import NotFound from './NotFound';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        colorPrimary: "#1677ff",
        colorBgBase: "#001529",
        colorTextBase: "#fff",
      }}
    >
      <Layout className="min-h-[100dvh]">
        <SideBar
          collapsed={collapsed}
          setIsMobile={setIsMobile}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          toggleTheme={toggleTheme}
          darkTheme={darkTheme}
        />

        {isMobile && (
          <CustomDrawer
            setDrawerVisible={setDrawerVisible}
            drawerVisible={drawerVisible}
            toggleTheme={toggleTheme}
            darkTheme={darkTheme}
          />
        )}

        <ContentWrapper collapsed={collapsed} isMobile={isMobile}>
          <Header collapsed={collapsed} setCollapsed={toggleSider} />

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/stocks/in" element={<StocksPage />} />
            <Route path="/stocks/out" element={<StocksPage />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/invoice" element={<Invoice />} />

            <Route path="/not-found" element={<NotFound />} />

            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </ContentWrapper>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
