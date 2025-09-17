import { useEffect, useState } from "react";
import { Table, Input, Button, Space, Select, Popconfirm, Tag } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ExportButton from "./../../components/ExportButton";
import { getUsers } from "./../../api/getUsers";

const { Option } = Select;

const UsersTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(searchParams.get("search"));
  const [pagination, setPagination] = useState({
    current: parseInt(searchParams.get("page") || 1),
    pageSize: parseInt(searchParams.get("pageSize") || 6),
    total: data.total || 0,
  });
  const [filters, setFilters] = useState({
    role: searchParams.get("role"),
    status: searchParams.get("status"),
  });

  const fetchData = async (params = {}, clean = false) => {
    setLoading(true);
    try {
      const res = await getUsers({
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
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText,
      role: filters.role || "",
      status: filters.status || "",
    });
    fetchData({ current: 1, pageSize: pagination.pageSize });
  };

  const handleApplyFilters = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText || "",
      role: filters.role || "",
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
    navigate("/users/add");
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
      role: filters.role || "",
      status: filters.status || "",
    });

    fetchData(updatedPagination);
  };

  const handleUserDelete = (id) => {
    console.log(id);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      className: "overflow-hidden text-ellipsis max-w-sm",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "overflow-hidden text-ellipsis max-w-sm",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        if (record.status === "Active")
          return <Tag color="success">{record.status}</Tag>;
        if (record.status === "Suspended")
          return <Tag color="error">{record.status}</Tag>;
        return <Tag color="default">{record.status}</Tag>;
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
              navigate(`/users/${record.username}/view`);
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
              navigate(`/users/${record.username}/edit`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.username}?`}
            onConfirm={(e) => {
              e?.stopPropagation();
              handleUserDelete(record.username);
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
      <PageHeader title={"Users"} />
      <Space direction="vertical" size="small" className="mb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
          <Input.Search
            placeholder="Search by Username / Full Name / Email"
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
            Add New User
          </Button>

          <ExportButton
            onExportExcel={() => console.log("Excel")}
            onExportPDF={() => console.log("PDF")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full">
          <Select
            placeholder="Filter by Role"
            allowClear
            value={filters.role}
            onChange={(val) => setFilters({ ...filters, role: val })}
            className="w-full"
          >
            <Option value="Admin">Admin</Option>
            <Option value="Manager">Manager</Option>
            <Option value="Cashier">Cashier</Option>
          </Select>

          <Select
            placeholder="Filter by Status"
            allowClear
            value={filters.status}
            onChange={(val) => setFilters({ ...filters, status: val })}
            className="w-full"
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Suspended">Suspended</Option>
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
    </>
  );
};

export default UsersTable;
