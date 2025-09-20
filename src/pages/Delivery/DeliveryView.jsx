import { Card, Descriptions, Tag, List, Skeleton, Alert } from "antd";
import { useFetch } from "../../hooks/useFetch";
import { getDelivery } from "../../api/getDeliveries";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const DeliveryView = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(getDelivery, { id });

  if (loading)
    return (
      <>
        <PageHeader title={"View Delivery"} showBack />
        <Skeleton.Node className="min-w-full min-h-[400px]" active />
      </>
    );

  if (error)
    return (
      <>
        <PageHeader title={"View Delivery"} showBack />
        <Alert message={error.message} type="error" />
      </>
    );

  return (
    <>
      <PageHeader title={"View Delivery"} showBack />
      <Card
        title={`Delivery Details: ${data?.data?.id}`}
        className="mx-auto shadow-md"
      >
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Delivery ID">
            {data?.data?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">
            {data?.data?.customer}
          </Descriptions.Item>
          <Descriptions.Item label="Driver">
            {data?.data?.driver}
          </Descriptions.Item>
          <Descriptions.Item label="Date">{data?.data?.date}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={
                data?.data?.status === "Initial"
                  ? "volcano"
                  : data?.data?.status === "Intransit"
                  ? "blue"
                  : "green"
              }
            >
              {data?.data?.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Products">
            <List
              size="small"
              dataSource={data?.data?.products || []}
              renderItem={(item) => (
                <List.Item>
                  <b>{item.product}</b> — Qty: {item.quantity}
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default DeliveryView;
