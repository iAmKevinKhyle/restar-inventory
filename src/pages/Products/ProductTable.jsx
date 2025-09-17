import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Select,
  Tag,
  Popconfirm,
  App,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { getProducts } from "../../api/getProducts";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StockAdjustmentModal from "./StockAdjustmentModal";
import SummaryCards from "./SummaryCards";
import ExportButton from './../../components/ExportButton';

const { Option } = Select;

const ProductTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(searchParams.get("search"));
  const [modalType, setModalType] = useState(null);
  const [pagination, setPagination] = useState({
    current: parseInt(searchParams.get("page") || 1),
    pageSize: parseInt(searchParams.get("pageSize") || 6),
    total: data.total || 0,
  });
  const [filters, setFilters] = useState({
    category: searchParams.get("category"),
    // supplier: undefined,
    status: searchParams.get("status"),
  });
  const [recordId, setRecordId] = useState(null);
  const { message } = App.useApp();

  const fetchData = async (params = {}, clean = false) => {
    setLoading(true);
    try {
      const res = await getProducts({
        page: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        search: clean ? "" : searchText,
        filters: clean ? {} : filters,
      });

      setData(res.data);
      setPagination({
        ...pagination,
        current: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        total: res.total,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText,
      category: filters.category || "",
      status: filters.status || "",
    });
    fetchData({ current: 1, pageSize: pagination.pageSize });
  };

  const handleApplyFilters = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText,
      category: filters.category || "",
      status: filters.status || "",
    });
    fetchData({ current: 1, pageSize: pagination.pageSize });
  };

  const handleReset = () => {
    setSearchText("");
    setFilters({});
    setData([]);
    setPagination({ ...pagination, total: 0, current: 1 });
    setSearchParams({});
    fetchData({ current: 1, pageSize: pagination.pageSize }, true);
  };

  const handleTransition = () => {
    navigate("/products/add");
  };

  const handleTableChange = (newPagination) => {
    const updatedPagination = {
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    };

    setPagination(updatedPagination);
    setSearchParams({
      page: updatedPagination.current,
      pageSize: updatedPagination.pageSize,
      search: searchText || "",
      category: filters.category || "",
      status: filters.status || "",
    });

    fetchData(updatedPagination);
  };

  const handleProductDelete = (id) => {
    console.log(id);
  };

  const handleStockAdjust = (values) => {
    message.success(
      `Stock ${modalType === "in" ? "added" : "deducted"} successfully!`
    );
    console.log("Adjustment:", {
      productId: recordId,
      type: modalType,
      ...values,
    });
    setModalType(null);
    setRecordId(null);
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      className: "overflow-hidden text-ellipsis max-w-sm",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    // {
    //   title: "Supplier",
    //   dataIndex: "supplier",
    //   key: "supplier",
    // },
    {
      title: "Quantity in Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty, record) => (
        <Tag color={qty < record.reorder_level ? "red" : "blue"}>{qty}</Tag>
      ),
    },
    {
      title: "Unit of Measure",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Cost Price",
      dataIndex: "cost_price",
      key: "cost_price",
      render: (value) => `₱${value.toFixed(2)}`,
    },
    {
      title: "Selling Price",
      dataIndex: "selling_price",
      key: "selling_price",
      render: (value) => `₱${value.toFixed(2)}`,
    },
    {
      title: "Reorder Level",
      dataIndex: "reorder_level",
      key: "reorder_level",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        if (record.quantity === 0) return <Tag color="red">Out of Stock</Tag>;
        if (record.quantity < record.reorder_level)
          return <Tag color="orange">Low Stock</Tag>;

        if (record.expiry_date) {
          const today = new Date();
          const expiry = new Date(record.expiry_date);
          const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

          if (diffDays < 0) return <Tag color="red">Expired</Tag>;
          if (diffDays <= 7) return <Tag color="gold">Near Expiry</Tag>;
        }

        return <Tag color="green">Available</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${record.product_id}/view`);
            }}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${record.product_id}/edit`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.name}?`}
            onConfirm={(e) => {
              e?.stopPropagation();
              handleProductDelete(record.product_id);
            }}
            onCancel={(e) => e.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            icon={<PlusOutlined />}
            size="small"
            type="dashed"
            onClick={(e) => {
              e.stopPropagation();
              setModalType("in");
              setRecordId(record.product_id);
            }}
          >
            Stock In
          </Button>
          <Button
            icon={<MinusOutlined />}
            size="small"
            type="dashed"
            onClick={(e) => {
              e.stopPropagation();
              setModalType("out");
              setRecordId(record.product_id);
            }}
          >
            Stock Out
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData({ current: pagination.current, pageSize: pagination.pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={"Products"} />
      <Space direction="vertical" size="small" className="mb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
          <Input.Search
            placeholder="Search by Name / SKU / Barcode"
            allowClear
            enterButton={<SearchOutlined title="Search" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            className="w-full col-span-2"
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleTransition}
            className="w-full"
          >
            Add New Product
          </Button>

          <ExportButton onExportExcel={() => console.log("Excel")} onExportPDF={() => console.log("PDF")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full">
          <Select
            placeholder="Filter by Category"
            allowClear
            value={filters.category}
            onChange={(val) => setFilters({ ...filters, category: val })}
            className="w-full"
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Food">Food</Option>
          </Select>

          <Select
            placeholder="Filter by Status"
            allowClear
            value={filters.status}
            onChange={(val) => setFilters({ ...filters, status: val })}
            className="w-full"
          >
            <Option value="Active">Active</Option>
            <Option value="Low Stock">Low Stock</Option>
            <Option value="Out of Stock">Out of Stock</Option>
            <Option value="Discontinued">Discontinued</Option>
          </Select>

          <Button
            type="default"
            icon={<FilterOutlined />}
            onClick={handleApplyFilters}
            className="w-full lg:col-span-2"
          >
            Apply Filters
          </Button>

          <Button
            type="dashed"
            icon={<ReloadOutlined />}
            onClick={handleReset}
            className="w-full"
          >
            Reset
          </Button>
        </div>
      </Space>

      <Space direction="vertical" size="small" className="mb-4 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-[100%]">
          <SummaryCards />
        </div>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="product_id"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20", "50", "100"],
          onShowSizeChange: (current, size) => {
            setPagination({
              ...pagination,
              pageSize: size,
              current: 1,
            });

            setSearchParams({
              ...searchParams,
              page: 1,
              pageSize: size
            });

            fetchData({ current: 1, pageSize: size });
          },
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
        className="whitespace-nowrap cursor-pointer"
        size="large"
        onRow={(record) => ({
          onClick: () => navigate(`/products/${record.product_id}/view`),
        })}
        rowClassName={(record) => {
          if (record.quantity === 0) return "out-of-stock";
          if (record.quantity < record.reorder_level) return "low-stock";

          if (record.expiry_date) {
            const today = new Date();
            const expiry = new Date(record.expiry_date);
            const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

            if (diffDays < 0) return "expired";
            if (diffDays <= 7) return "expiring";
          }

          return "";
        }}
      />

      {modalType && (
        <StockAdjustmentModal
          open={!!modalType}
          onCancel={() => {
            setModalType(null);
            setRecordId(null);
          }}
          onSubmit={handleStockAdjust}
          type={modalType}
          product={recordId}
        />
      )}
    </>
  );
};

export default ProductTable;
