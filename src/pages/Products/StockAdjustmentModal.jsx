import { Modal, Form, InputNumber, Select } from "antd";

const StockAdjustmentModal = ({ open, onCancel, onSubmit, type, product }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  return (
    <Modal
      title={`${type === "in" ? "Stock In" : "Stock Out"} - ${product}`}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Confirm"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Reason"
          name="reason"
          rules={[{ required: true, message: "Please select reason" }]}
        >
          <Select placeholder="Select reason">
            <Select.Option value="manual">Manual Adjustment</Select.Option>
            <Select.Option value="damage">Damaged</Select.Option>
            <Select.Option value="expiry">Expired</Select.Option>
            <Select.Option value="return">Customer Return</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockAdjustmentModal;
