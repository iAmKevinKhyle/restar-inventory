import { Card, Skeleton } from "antd";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getStockData } from './../../api/getChartData';
import { useFetch } from "../../hooks/useFetch";

const StockMovementChart = () => {
  const { data, loading, error } = useFetch(getStockData, []);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />

  return (
    <Card title="Stock In vs Stock Out">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={(data || [])}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stockIn" fill="#1677ff" />
          <Bar dataKey="stockOut" fill="#ff4d4f" />
          <Line type="monotone" dataKey="stockOut" stroke="#ff4d4f" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StockMovementChart;
