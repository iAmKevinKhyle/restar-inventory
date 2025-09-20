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
  Skeleton,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAllProducts } from "./../../api/getProducts";
import PageHeader from "./../../components/PageHeader";
import { getDelivery } from "../../api/getDeliveries";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const { Option } = Select;

const DeliveryEdit = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const { message } = App.useApp();
  const { id } = useParams();
  const { data, loading } = useFetch(getDelivery, { id });

  const handleUpdateDelivery = (values) => {
    const updatedDelivery = {
      ...data?.data,
      customer: values.customer,
      products: values.products,
      driver: values.driver,
      deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),
      notes: values.notes || "",
    };

    console.log("Delivery Updated:", updatedDelivery);
    message.success("Delivery updated successfully!");
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        deliveryId: data?.data?.id,
        customer: data?.data?.customer,
        products: data?.data?.products,
        driver: data?.data?.driver,
        deliveryDate: dayjs(data?.data?.date),
        notes: data?.data?.notes || "",
      });
    }
  }, [form, data]);

  return (
    <>
      <PageHeader title={"Edit Delivery"} showBack />

      {loading ? (
        <Skeleton.Node className="min-w-full min-h-[500px]" active/>
      ) : (
        <Card
          title={`Editing Delivery: ${data?.data?.id || ""}`}
          className="mx-auto shadow-md"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateDelivery}
            initialValues={{ products: [] }}
          >
            {/* Delivery ID (read-only) */}
            <Form.Item label="Delivery ID" name="deliveryId">
              <Input disabled />
            </Form.Item>

            {/* Customer */}
            <Form.Item
              label="Customer / Destination"
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please enter customer/destination",
                },
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
                            {products.map((p) => (
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
                          rules={[
                            { required: true, message: "Enter quantity" },
                          ]}
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
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

export default DeliveryEdit;
