import { Card, theme, Alert, Skeleton } from "antd";
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getSummary } from "../../api/getSummary";

import {
  ShoppingCartOutlined,
  AppstoreAddOutlined,
  StockOutlined,
  TruckOutlined,
  FileDoneOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const SummaryCards = () => {
  const { data, loading, error } = useFetch(getSummary, []);

  const {
    token: { colorBgBase, colorTextLabel },
  } = theme.useToken();

  const iconMap = useMemo(
    () => ({
      ShoppingCartOutlined,
      AppstoreAddOutlined,
      StockOutlined,
      TruckOutlined,
      FileDoneOutlined,
      WarningOutlined,
    }),
    []
  );

  const summaryData = useMemo(() => {
    if (!data) return [];
    return data.map((item) => {
      const IconComponent = iconMap[item.icon];
      return {
        ...item,
        icon: IconComponent ? (
          <IconComponent style={{ fontSize: 24, color: "#000fff" }} />
        ) : null,
      };
    });
  }, [data, iconMap]);

  if (loading) return (
    <>
      <Skeleton.Node style={{ width: "100%" }} active="true"  />
      <Skeleton.Node style={{ width: "100%" }} active="true" />
      <Skeleton.Node style={{ width: "100%" }} active="true" />
      <Skeleton.Node style={{ width: "100%" }} active="true" />
      <Skeleton.Node style={{ width: "100%" }} active="true" />
      <Skeleton.Node style={{ width: "100%" }} active="true" />
    </>
  );
  if (error) return <Alert message={error.message} type="error" />;

  return (
    <>
      {summaryData.map((item, index) => (
        <Card
          key={index}
          variant="bordered"
          className="shadow-md rounded-2xl"
          style={{ backgroundColor: colorBgBase }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: colorTextLabel }}
              >
                {item.title}
              </h3>
              <p
                className="text-2xl font-bold"
                style={{ color: colorTextLabel }}
              >
                {item.value}
              </p>
            </div>
            <div
              className="rounded-lg p-2"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default SummaryCards;
