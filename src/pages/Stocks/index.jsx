// StocksPage.jsx
import { Tabs, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import StocksIn from "./StocksIn";
import StocksOut from "./StocksOut";
import PageHeader from "../../components/PageHeader";

const StocksPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBorderSecondary, colorBgBase },
  } = theme.useToken();

  const activeKey = location.pathname.includes("/stocks/out") ? "out" : "in";

  const handleTabChange = (key) => {
    navigate(`/stocks/${key}`);
  };

  const items = [
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
      activeKey={activeKey}
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
        width: "100%"
      }}
    />
  );
};

export default StocksPage;
