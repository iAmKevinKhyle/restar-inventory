import { Alert, Card, Skeleton } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { generateColors } from "../../utils/colorUtils";
import { getCategoryData } from "./../../api/getChartData";
import { useFetch } from "../../hooks/useFetch";

const CategoryDistribution = () => {
  const { data, loading, error } = useFetch(getCategoryData);

  if (loading)
    return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  const COLORS = generateColors((data || []).length);

  return (
    <Card title="Category Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data || []}
            dataKey="value"
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
    </Card>
  );
};

export default CategoryDistribution;
