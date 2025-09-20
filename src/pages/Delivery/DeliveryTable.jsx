import { Table, Button, Space, Tag, Popconfirm } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  SendOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'

const DeliveryTable = ({
  data,
  pagination,
  setPagination,
  loading,
  handleTableChange,
  searchParams,
  setSearchParams,
  fetchData,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Delivery ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Customer/Destination",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Products",
      key: "products",
      className: "overflow-hidden text-ellipsis max-w-sm",
      render: (record) => {
        let allProducts = ""
        const l = record.products.length - 1

        record.products.map((prod, i) => {
          if (i === l) {
            allProducts += `${prod.product} (${prod.quantity})`
            return;
          }

          allProducts += `${prod.product} (${prod.quantity}), `
        })

        return allProducts;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => (
        <Tag
          color={
            s === "Initial"
              ? "orange"
              : s === "Intransit"
              ? "blue"
              : s === "Delivered"
              ? "green"
              : "default"
          }
        >
          {s}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/delivery/${record.id}/view`)}
            type="dashed"
          >
            View
          </Button>

          {record.status === "Initial" && (
            <>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => navigate(`/delivery/${record.id}/edit`)}
              >
                Edit
              </Button>

              <Popconfirm
                title="Cancel delivery"
                description="Are you sure to cancel this delivery?"
                onConfirm={() => console.log("Cancelling: ", record)}
                onCancel={() => console.log("Cancel Action Canceled!")}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <Button danger icon={<DeleteOutlined />} size="small">
                  Cancel
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Dispatch the delivery"
                description="Are you sure to dispatch this delivery?"
                onConfirm={() => console.log("Dispatching: ", record)}
                onCancel={() => console.log("Dispatch Canceled!")}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <Button type="primary" size="small" icon={<SendOutlined />}>
                  Dispatch
                </Button>
              </Popconfirm>
            </>
          )}

          {record.status === "Intransit" && (
            <Button type="primary" size="small" icon={<CheckCircleOutlined />}>
              Mark Delivered
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "15",
          "20",
          "50",
          "100",
        ],
        onShowSizeChange: (current, size) => {
          setPagination({
            ...pagination,
            pageSize: size,
            current: 1,
          });

          setSearchParams({
            ...searchParams,
            page: 1,
            pageSize: size,
          });

          fetchData({ current: 1, pageSize: size });
        },
      }}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
      className="whitespace-nowrap"
      size="large"
    />
  );
};

export default DeliveryTable;
