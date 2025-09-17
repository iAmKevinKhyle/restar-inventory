import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Card,
  App,
  DatePicker,
  Checkbox,
} from "antd";
import PageHeader from "../../components/PageHeader";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../api/getProduct";
import { useFetch } from "../../hooks/useFetch";
import dayjs from "dayjs";

const { Option } = Select;

const ProductEditForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [noExpiry, setNoExpiry] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useFetch(getProduct, { id });

  // Load product details
  useEffect(() => {
    try {
      form.setFieldsValue({
        name: data?.data?.name,
        description: data?.data?.description,
        category: data?.data?.category,
        supplier: data?.data?.supplier,
        barcode: data?.data?.barcode,
        cost_price: data?.data?.cost_price,
        selling_price: data?.data?.selling_price,
        unit: data?.data?.unit,
        quantity: data?.data?.quantity,
        reorder_level: data?.data?.reorder_level,
        expiry_date: data?.data?.expiry_date
          ? dayjs(data?.data?.expiry_date)
          : "",
      });

      // If product has an image, preload it
      if (data?.data?.image) {
        setFileList([
          {
            uid: "-1",
            name: "current-image.png",
            status: "done",
            url: data?.data?.image,
          },
        ]);
      }

      if (!data?.data?.expiry_date) {
        setNoExpiry(true);
      } else {
        setNoExpiry(false);
      }
    } catch (error) {
      message.error("Failed to load product details: " + error);
    }
  }, [id, form, data, message]);

  const handleFinish = async (values) => {
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

      console.log("Edited Values: ", values);

      message.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      message.error("Failed to update product: " + error);
    }
  };

  return (
    <>
      <PageHeader title={"Edit Product"} showBack />
      <Card title="Edit Product" variant={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{}}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Category" name="category">
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
                    ? []
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
                style={{ marginTop: "5px" }}
              >
                No Expiry
              </Checkbox>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Barcode" name="barcode">
              <Input />
            </Form.Item>

            <Form.Item label="Cost Price" name="cost_price">
              <InputNumber
                min={0}
                prefix="₱"
                style={{ width: "100%" }}
                step={0.01}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Selling Price" name="selling_price">
              <InputNumber
                min={0}
                prefix="₱"
                style={{ width: "100%" }}
                step={0.01}
              />
            </Form.Item>

            <Form.Item label="Unit of Measure" name="unit">
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Initial Stock Quantity" name="quantity">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Reorder Point" name="reorder_level">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item label="Product Image">
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ProductEditForm;
