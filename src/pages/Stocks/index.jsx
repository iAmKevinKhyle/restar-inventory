import { Tabs, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import StocksIn from "./StocksIn";
import StocksOut from "./StocksOut";
import AllMovements from "./AllMovements";
import PageHeader from "../../components/PageHeader";
import { useState, useEffect } from "react";

const StocksPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBorderSecondary, colorBgBase },
  } = theme.useToken();

  const handleTabChange = (key) => {
    navigate(key === "all" ? "/stocks" : `/stocks/${key}`);
  };

  useEffect(() => {
    let activeKey = "all";

    if (location.pathname.includes("stocks/in")) {
      activeKey = "in";
    }

    if (location.pathname.includes("stocks/out")) {
      activeKey = "out";
    }

    setActiveTab(activeKey);
  }, [location]);

  const items = [
    {
      key: "all",
      label: "All",
      children: (
        <div className="flex-1 overflow-y-auto pb-20">
          {" "}
          <div className="p-6">
            <PageHeader title="Inventory - All" />
            <AllMovements />
          </div>
        </div>
      ),
    },
    {
      key: "in",
      label: "Stock In",
      children: (
        <div className="flex-1 overflow-y-auto pb-20">
          {" "}
          <div className="p-6">
            <PageHeader title="Inventory - Stock In" />
            <StocksIn />
          </div>
        </div>
      ),
    },
    {
      key: "out",
      label: "Stock Out",
      children: (
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-6">
            <PageHeader title="Inventory - Stock Out" />
            <StocksOut />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      tabPosition="bottom"
      className="flex flex-col h-full"
      style={{ backgroundColor: colorBorderSecondary }}
      items={items}
      tabBarStyle={{
        position: "fixed",
        bottom: 0,
        zIndex: 50,
        paddingInline: 24,
        backgroundColor: colorBgBase,
        width: "100%",
      }}
    />
  );
};

export default StocksPage;
