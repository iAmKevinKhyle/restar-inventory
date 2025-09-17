import { Alert, Card, List, Skeleton, Tag, theme } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { getProductAlert } from "../../api/getProductAlert";
import { useFetch } from "../../hooks/useFetch";
import { useMemo } from "react";

const ExpiredProduct = () => {
  const { data, loading, error } = useFetch(getProductAlert);

  const {
    token: { colorError, colorBgBase },
  } = theme.useToken();

  const now = useMemo(() => new Date(), []);

  const expiredItems = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (!p.expiry_date) return false;
      const expiry = new Date(p.expiry_date);
      const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
      return diffDays <= 0;
    });
  }, [data, now]);

  if (loading)
    return <Skeleton.Node style={{ width: "100%", height: 300 }} active />;
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <Card
      title={
        <>
          <WarningOutlined style={{ color: colorError }} /> Expired Product
        </>
      }
      variant="false"
      className="rounded-2xl shadow-md"
      style={{ backgroundColor: colorBgBase }}
    >
      <List
        dataSource={expiredItems}
        renderItem={(item) => {
          return (
            <List.Item>
              <span>{item.name}</span>
              <Tag color={colorError}>Expired</Tag>
            </List.Item>
          );
        }}
        locale={{ emptyText: "No items expired" }}
      />
    </Card>
  );
};

export default ExpiredProduct;
