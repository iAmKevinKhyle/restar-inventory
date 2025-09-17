import { Table, Tag } from "antd";
import { Link } from "react-router-dom";

const StockMovementTable = ({ data, loading }) => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <Link to={`/products/${record.product_id}`} className="text-blue-500 hover:underline">
          {text}
        </Link>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty, record) => (
        <Tag color={record.type === "in" ? "green" : "red"}>
          {record.type === "in" ? `+${qty}` : `-${qty}`}
        </Tag>
      ),
    },
    {
      title: "Reference No.",
      dataIndex: "reference_no",
      key: "reference_no",
    },
    {
      title: "Supplier / Customer",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Processed By",
      dataIndex: "user",
      key: "user",
    },
  ];

  return (
    <Table
      rowKey="transaction_id"
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: "max-content" }}
      className="whitespace-nowrap cursor-pointer"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      bordered
    />
  );
};

export default StockMovementTable;
