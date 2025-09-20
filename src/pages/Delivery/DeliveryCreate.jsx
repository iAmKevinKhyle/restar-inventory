import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  Divider,
  Row,
  Col,
  App,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllProducts } from "./../../api/getProducts";
import PageHeader from "./../../components/PageHeader";

const { Option } = Select;

const DeliveryCreate = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const { message } = App.useApp();
  // const selectedProducts = Form.useWatch("products", form) || [];

  const handleCreateDelivery = (values) => {
    const newDelivery = {
      deliveryId: `DLV-${Date.now()}`, // Auto-generate ID
      customer: values.customer,
      products: values.products,
      driver: values.driver,
      deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),
      notes: values.notes || "",
      status: "Initial",
    };

    console.log("New Delivery Created:", newDelivery);
    message.success("Delivery created successfully!");
    form.resetFields();
  };

  useEffect(() => {
    const setFetchedData = async () => {
      const fetchedData = await getAllProducts();
      setProducts(fetchedData.data);
    };

    setFetchedData();

    setDrivers([
      { id: 1, name: "John Driver" },
      { id: 2, name: "Maria Courier" },
      { id: 3, name: "Mike Transport" },
    ]);
  }, []);

  return (
    <>
      <PageHeader title={"Create Delivery"} showBack />
      <Card title={"Create a new delivery"} className="mx-auto shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateDelivery}
          initialValues={{ products: [] }}
        >
          {/* Delivery ID (auto) */}
          <Form.Item label="Delivery ID">
            <Input value={`DLV-${Date.now()}`} disabled />
          </Form.Item>

          {/* Customer */}
          <Form.Item
            label="Customer / Destination"
            name="customer"
            rules={[
              { required: true, message: "Please enter customer/destination" },
            ]}
          >
            <Input placeholder="Enter customer name or destination" />
          </Form.Item>

          {/* Products Multi-Select */}
          <Form.List
            name="products"
            rules={[
              { required: true, message: "Please add at least one product" },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row gutter={8} key={field.key} align="top">
                    <Col flex="auto">
                      <Form.Item
                        name={[field.name, "product"]}
                        rules={[
                          { required: true, message: "Select a product" },
                        ]}
                        className="mb-0"
                      >
                        <Select placeholder="Select product">
                          {products
                            // .filter(
                            //   (p) =>
                            //     !selectedProducts?.some(
                            //       (sp, i) =>
                            //         sp?.product === p.product_id &&
                            //         i !== field.name
                            //     )
                            // )
                            .map((p) => (
                              <Option key={p.product_id} value={p.product_id}>
                                ({p.quantity} {p.unit}) - {p.name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col>
                      <Form.Item
                        name={[field.name, "quantity"]}
                        rules={[{ required: true, message: "Enter quantity" }]}
                      >
                        <InputNumber min={1} placeholder="Qty" />
                      </Form.Item>
                    </Col>

                    <Col>
                      <Button danger onClick={() => remove(field.name)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Product
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Driver */}
          <Form.Item
            label="Assigned Driver / Courier"
            name="driver"
            rules={[
              { required: true, message: "Please assign a driver/courier" },
            ]}
          >
            <Select placeholder="Select driver">
              {drivers.map((d) => (
                <Option key={d.id} value={d.name}>
                  {d.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Delivery Date */}
          <Form.Item
            label="Delivery Date"
            name="deliveryDate"
            rules={[
              { required: true, message: "Please select a delivery date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>

          {/* Notes */}
          <Form.Item label="Notes / Instructions" name="notes">
            <Input.TextArea
              rows={3}
              placeholder="Enter notes or delivery instructions"
            />
          </Form.Item>

          <Divider />

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Delivery
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default DeliveryCreate;
