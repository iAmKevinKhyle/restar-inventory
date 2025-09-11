import { theme } from "antd";

// Summary and Alerts
import ExpiringSoon from "./ExpiringSoon";
import LowStockAlerts from "./LowStockAlerts";
import OutOfStockItems from "./OutOfStockItems ";
import ExpiredProduct from "./ExpiredProduct";
import SummaryCards from "./SummaryCards";

// Charts
import StockMovementChart from "../../components/charts/StockMovementChart";
import TopSellingProducts from "../../components/charts/TopSellingProducts";
import CategoryDistribution from "../../components/charts/CategoryDistribution";
import SupplierContribution from "../../components/charts/SupplierContribution";

// recent activities
import RecentUserActions from "./RecentUserActions";
import RecentStockMovements from "./RecentStockMovements";
import RecentOrders from "./RecentOrders";

const Dashboard = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div className="p-6" style={{ backgroundColor: colorBorderSecondary }}>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SummaryCards />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <LowStockAlerts />
        <OutOfStockItems />
        <ExpiringSoon />
        <ExpiredProduct />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StockMovementChart />
        <TopSellingProducts />
        <CategoryDistribution />
        <SupplierContribution />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <RecentUserActions />
        <RecentStockMovements />
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
