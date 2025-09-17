import { Card, List, Tag, Skeleton, Alert } from "antd";
import { getRecentOrders } from "../../api/getRecentData";
import { useFetch  } from "../../hooks/useFetch";

const RecentOrders = () => {
  const { data, loading, error } = useFetch(getRecentOrders);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  const statusColors = {
    Delivered: "green",
    Pending: "orange",
    Shipped: "blue",
  };
  return (
    <Card title="Recent Orders / Deliveries">
      <List
        dataSource={(data || [])}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="flex justify-between items-center">
                  <span>{item.supplier}</span>
                  <Tag
                    color={statusColors[item.status] || "default"}
                    className="ml-2"
                  >
                    {item.status}
                  </Tag>
                </div>
              }
              description={`Date: ${item.date}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentOrders;
