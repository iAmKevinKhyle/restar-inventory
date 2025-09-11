
import { Card, List, Skeleton, Tag, theme } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { getProductAlert } from "../../api/getProductAlert";
import { useFetch } from "../../hooks/useFetch";

const OutOfStockItems = () => {
  const { data, loading, error } = useFetch(getProductAlert, []);

  const {
    token: { colorError, colorBgBase },
  } = theme.useToken();

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />
  if (error) return <Alert message={error.message} type="error" />

  return (
  <Card
    title={<><StopOutlined style={{ color: colorError }} /> Out of Stock</>}
    variant="false"
    className="rounded-2xl shadow-md"
    style={{ backgroundColor: colorBgBase }}
  >
    <List
      dataSource={(data || []).filter(p => p.quantity === 0)}
      renderItem={item => (
        <List.Item>
          <span>{item.name}</span>
          <Tag color={colorError}>Out of Stock</Tag>
        </List.Item>
      )}
      locale={{ emptyText: "No items out of stock" }}
    />
  </Card>
)};

export default OutOfStockItems;