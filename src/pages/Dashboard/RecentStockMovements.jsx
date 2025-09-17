import { Card, List, Tag, Skeleton, Alert } from "antd";
import { getRecentStockMovements } from "../../api/getRecentData";
import { useFetch  } from "../../hooks/useFetch";

const RecentStockMovements = () => {
  const { data, loading, error } = useFetch(getRecentStockMovements);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <Card title="Recent Stock Movements">
      <List
        dataSource={(data || [])}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <Tag color={item.type === "In" ? "green" : "red"}>
                    {item.type}
                  </Tag>
                  <span className="ml-2">{item.product}</span>
                </>
              }
              description={`Quantity: ${item.qty} | Date: ${item.date}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentStockMovements;
