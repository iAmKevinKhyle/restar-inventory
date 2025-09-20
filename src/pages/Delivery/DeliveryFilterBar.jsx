import {
  Input,
  Button,
  Space,
  Select,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ExportButton from "./../../components/ExportButton";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DeliveryFilterBar = ({
  searchText,
  setSearchText,
  handleSearch,
  handleTransition,
  filters,
  setFilters,
  handleApplyFilters,
  handleReset
}) => {
  return (
    <>
      <Space direction="vertical" size="small" className="mb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
          <Input.Search
            placeholder="Search by Customer Name / Delivery ID"
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
            Create Delivery
          </Button>

          <ExportButton
            onExportExcel={() => console.log("Excel")}
            onExportPDF={() => console.log("PDF")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full">
          <RangePicker
            value={[
              filters.startDate ? dayjs(filters.startDate) : null,
              filters.endDate ? dayjs(filters.endDate) : null,
            ]}
            onChange={(val) => {
              setFilters({
                ...filters,
                startDate: val ? val[0]?.format("YYYY-MM-DD") : null,
                endDate: val ? val[1]?.format("YYYY-MM-DD") : null,
              });
            }}
          />

          <Select
            placeholder="Select product"
            allowClear
            value={filters.product}
            onChange={(val) => setFilters({ ...filters, product: val })}
          >
            {[
              {
                product_id: "P001",
                name: "Product 1",
              },
            ].map((p) => (
              <Option key={p.product_id} value={p.name}>
                {p.name}
              </Option>
            ))}
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
    </>
  );
};

export default DeliveryFilterBar;
