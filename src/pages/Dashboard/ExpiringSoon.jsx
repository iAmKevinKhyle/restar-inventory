import { Card, List, Skeleton, Tag, theme } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getProductAlert } from "../../api/getProductAlert";
import { useFetch } from "../../hooks/useFetch";
import { useMemo } from "react";

const ExpiringSoon = () => {
  const { data, loading, error } = useFetch(getProductAlert, []);

  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();

  const soonThreshold = 7; // days
  const now = useMemo(() => new Date(), []);

  const expiringItems = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (!p.expiry_date) return false;
      const expiry = new Date(p.expiry_date);
      const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= soonThreshold;
    });
  }, [data, now]);

  if (loading)
    return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <Card
      title={
        <>
          <ClockCircleOutlined style={{ color: colorPrimary }} /> Expiring Soon
        </>
      }
      variant="false"
      className="rounded-2xl shadow-md"
      style={{ backgroundColor: colorBgBase }}
    >
      <List
        dataSource={expiringItems}
        renderItem={(item) => {
          const diffDays = Math.ceil(
            (new Date(item.expiry_date) - now) / (1000 * 60 * 60 * 24)
          );
          return (
            <List.Item>
              <span>{item.name}</span>
              <Tag color={colorPrimary}>Expires in {diffDays} days</Tag>
            </List.Item>
          );
        }}
        locale={{ emptyText: "No items expiring soon" }}
      />
    </Card>
  );
};

export default ExpiringSoon;
