import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { getDeliveries } from "./../../api/getDeliveries";
import DeliveryTable from "./DeliveryTable";
import DeliveryFilterBar from "./DeliveryFilterBar";

const DeliveryDelivered = () => {
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
    status: "Delivered",
    startDate: searchParams.get("startDate") || null,
    endDate: searchParams.get("endDate") || null,
    product: searchParams.get("product"),
  });

  const fetchData = async (params = {}, clean = false) => {
    setLoading(true);
    try {
      const res = await getDeliveries({
        page: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        search: clean ? "" : searchText,
        filters: clean ? { status: "Delivered" } : filters,
      });

      setData(res.data);
      setPagination({
        ...pagination,
        current: params.current || pagination.current,
        pageSize: params.pageSize || pagination.pageSize,
        total: res.total,
      });
    } catch (err) {
      console.error("Error fetching deliveries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText || "",
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
      product: filters.product || "",
    });
    fetchData({ current: 1, pageSize: pagination.pageSize });
  };

  const handleApplyFilters = () => {
    setSearchParams({
      ...searchParams,
      pageSize: pagination.pageSize || 6,
      search: searchText || "",
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
      product: filters.product || "",
    });

    fetchData({ current: 1, pageSize: pagination.pageSize });
  };

  const handleReset = () => {
    setSearchText("");
    setFilters({ status: "Delivered" });
    setData([]);
    setPagination({ ...pagination, total: 0, current: 1 });
    setSearchParams({});
    fetchData({ current: 1, pageSize: pagination.pageSize }, true);
  };

  const handleTransition = () => {
    navigate("/delivery/create");
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
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
      product: filters.product || "",
    });

    fetchData(updatedPagination);
  };

  useEffect(() => {
    fetchData({ current: pagination.current, pageSize: pagination.pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={"Delivery Delivered"} />
      <DeliveryFilterBar 
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        handleTransition={handleTransition}
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={handleApplyFilters}
        handleReset={handleReset}
      />

      <DeliveryTable
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        handleTableChange={handleTableChange}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        fetchData={fetchData}
      />
    </>
  );
};

export default DeliveryDelivered;
