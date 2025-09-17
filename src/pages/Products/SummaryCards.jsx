import { Alert, Skeleton, Tag } from "antd";
import {
  ClockCircleOutlined,
  ShoppingCartOutlined,
  StopOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { getProductSummaryCount } from "./../../api/getSummary";
import { useFetch } from "../../hooks/useFetch";

const SummaryCards = () => {
  const { data, loading, error } = useFetch(getProductSummaryCount);

  if (loading) return (
    <>
        <Skeleton.Node className="lg:col-span-1 col-span-2 min-w-full max-h-6" active />
        <Skeleton.Node className="min-w-full max-h-6" active />
        <Skeleton.Node className="min-w-full max-h-6" active />
        <Skeleton.Node className="min-w-full max-h-6" active />
        <Skeleton.Node className="min-w-full max-h-6" active />
    </>
  )

  if (error) return <Alert message={"Loading summary failed!"} type="error"/>

  return (
    <>
      <Tag
        icon={<ShoppingCartOutlined />}
        color="success"
        className="lg:col-span-1 col-span-2 m-0"
        style={{ margin: 0 }}
      >
        <span>Total Product: </span>
        <span className="font-bold">{data.total}</span>
      </Tag>
      <Tag icon={<WarningOutlined />} color="warning" style={{ margin: 0 }}>
        <span>Low Stock: </span>
        <span className="font-bold">{data.low}</span>
      </Tag>
      <Tag icon={<StopOutlined />} color="error" style={{ margin: 0 }}>
        <span>Out of Stock: </span>
        <span className="font-bold">{data.out}</span>
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="processing" style={{ margin: 0 }}>
        <span>Expiring: </span>
        <span className="font-bold">{data.expiring}</span>
      </Tag>
      <Tag icon={<WarningOutlined />} color="purple" style={{ margin: 0 }}>
        <span>Expired: </span>
        <span className="font-bold">{data.expired}</span>
      </Tag>
    </>
  );
};

export default SummaryCards;
