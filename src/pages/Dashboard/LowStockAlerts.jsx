import { Card, List, Tag, theme, Skeleton, Alert } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { getProductAlert } from "../../api/getProductAlert";
import { useFetch } from "../../hooks/useFetch";

const LowStockAlerts = () => {
  const { data, loading, error } = useFetch(getProductAlert);

  const {
    token: { colorWarning, colorBgBase },
  } = theme.useToken();

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <Card
      title={
        <>
          <WarningOutlined style={{ color: colorWarning }} /> Low Stock Alerts
        </>
      }
      variant="false"
      className="rounded-2xl shadow-md"
      style={{ backgroundColor: colorBgBase }}
    >
      <List
        dataSource={(data || []).filter(
          (p) => p.quantity > 0 && p.quantity < p.reorder_level
        )}
        renderItem={(item) => (
          <List.Item>
            <span>{item.name}</span>
            <Tag color={colorWarning}>{item.quantity} left</Tag>
          </List.Item>
        )}
        locale={{ emptyText: "No low stock items" }}
      />
    </Card>
  );
};

export default LowStockAlerts;
