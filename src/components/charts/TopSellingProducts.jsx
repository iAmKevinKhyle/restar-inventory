import { Alert, Card, Skeleton, Tabs } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { generateColors } from "../../utils/colorUtils";
import { getProductData } from './../../api/getChartData';
import { useFetch } from "../../hooks/useFetch";

const TopSellingProducts = () => {
  const { data, loading, error } = useFetch(getProductData, []);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  const COLORS = generateColors((data || []).length);

  return (
    <Card title="Top Selling Products">
      <Tabs
        defaultActiveKey="bar"
        items={[
          {
            key: "bar",
            label: "Bar Chart",
            children: (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={(data || [])}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1677ff" />
                </BarChart>
              </ResponsiveContainer>
            ),
          },
          {
            key: "pie",
            label: "Pie Chart",
            children: (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={(data || [])}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {(data || []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default TopSellingProducts;
