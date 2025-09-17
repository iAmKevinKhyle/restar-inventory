import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  App,
  Upload,
  DatePicker,
  Checkbox,
  Divider,
  Space,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import PageHeader from "../../components/PageHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const ProductAddForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [noExpiry, setNoExpiry] = useState(false);
  const [items, setItems] = useState(["pcs", "box", "kg", "liters"]);
  const [customUnit, setCustomUnit] = useState("");
  const { message } = App.useApp();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key, value) => {
        if (key === "expiry_date") {
          if (!noExpiry) {
            formData.append("expiry_date", dayjs(value).format("YYYY-MM-DD"));
          }
        } else {
          formData.append(key, value);
        }
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      // await axios.put(`/api/products/${id}`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("Added Values: ", values);

      message.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      message.error("Failed to add product: " + error);
    }
  };

  const addItem = () => {
    if (customUnit && !items.includes(customUnit)) {
      setItems([...items, customUnit]);
      setCustomUnit("");
    }
  };

  return (
    <>
      <PageHeader title={"Add New Products"} showBack />
      <Card title="Add New Product" className="mx-auto shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            unit: "pcs",
          }}
        >
          {/* Name & Description */}
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          {/* Category & Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                <Option value="Electronics">Electronics</Option>
                <Option value="Clothing">Clothing</Option>
                <Option value="Food">Food</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Expiry Date" required>
              <Form.Item
                name="expiry_date"
                noStyle
                rules={
                  noExpiry
                    ? [] // no validation when no expiry
                    : [
                        {
                          required: true,
                          message: "Please select an expiry date",
                        },
                      ]
                }
              >
                <DatePicker
                  disabled={noExpiry}
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>

              <Checkbox
                checked={noExpiry}
                onChange={(e) => setNoExpiry(e.target.checked)}
                style={{ marginTop: "8px" }}
              >
                No Expiry
              </Checkbox>
            </Form.Item>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Barcode"
              name="barcode"
              rules={[{ required: true, message: "Please enter barcode" }]}
            >
              <Input placeholder="Enter Barcode" />
            </Form.Item>

            <Form.Item
              label="Cost Price"
              name="costPrice"
              rules={[{ required: true, message: "Enter cost price" }]}
            >
              <InputNumber
                min={0}
                prefix="₱"
                style={{ width: "100%" }}
                placeholder="0.00"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Selling Price"
              name="sellingPrice"
              rules={[{ required: true, message: "Enter selling price" }]}
            >
              <InputNumber
                min={0}
                prefix="₱"
                style={{ width: "100%" }}
                placeholder="0.00"
              />
            </Form.Item>

            <Form.Item
              label="Unit of Measure"
              name="unit"
              rules={[{ required: true, message: "Select unit" }]}
            >
              <Select
                placeholder="Select or add unit"
                popupRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Custom unit"
                        value={customUnit}
                        onChange={(e) => setCustomUnit(e.target.value)}
                        onPressEnter={addItem}
                      />
                      <a onClick={addItem}>Add</a>
                    </Space>
                  </>
                )}
              >
                {items.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Stock & Reorder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Initial Stock Quantity"
              name="stock"
              rules={[{ required: true, message: "Enter initial stock" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Reorder Point"
              name="reorderPoint"
              rules={[{ required: true, message: "Enter reorder threshold" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* Image */}
          <Form.Item label="Product Image" name="image">
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ProductAddForm;
