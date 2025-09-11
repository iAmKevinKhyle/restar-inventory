import { Card, List, Avatar, Skeleton, Alert } from "antd";
import { getRecentActions } from "../../api/getRecentData";
import { useFetch  } from "../../hooks/useFetch";

const RecentUserActions = () => {
  const { data, loading, error } = useFetch(getRecentActions, []);

  if (loading) return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <Card title="Recent User Actions">
      <List
        itemLayout="horizontal"
        dataSource={(data || [])}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.user.charAt(0)}</Avatar>}
              title={item.user}
              description={
                <>
                  <div>{item.action}</div>
                  <small style={{ color: "#888" }}>{item.date}</small>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentUserActions;
