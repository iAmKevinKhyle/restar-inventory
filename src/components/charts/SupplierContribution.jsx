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
import { getSupplierData } from './../../api/getChartData';
import { useFetch } from "../../hooks/useFetch";

const SupplierContribution = () => {
  const { data, loading, error } = useFetch(getSupplierData);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  const COLORS = generateColors((data || []).length);

  return (
    <Card title="Supplier Contribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={(data || [])}
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

export default SupplierContribution;
