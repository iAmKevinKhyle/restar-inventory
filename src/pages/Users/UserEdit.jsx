import { Form, Input, Select, Button, Card, App, Upload } from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import PageHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getUser } from "./../../api/getUser";
import { useEffect } from "react";

const { Option } = Select;

const UserEdit = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { username } = useParams();
  const { data } = useFetch(getUser, { username });

  const handleSubmit = (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key, value) => {
        formData.append(key, value);
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      // await axios.put(`/api/users/${id}`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("Added Values: ", values);

      message.success("User edited successfully!");
      navigate("/users");
    } catch (error) {
      message.error("Failed to edit user: " + error);
    }
  };

  // Load product details
  useEffect(() => {
    try {
      form.setFieldsValue({
        id: data?.data?.id,
        username: data?.data?.username,
        fullName: data?.data?.fullName,
        email: data?.data?.email,
        role: data?.data?.role,
        status: data?.data?.status,
        lastLogin: data?.data?.lastLogin,
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
    } catch (error) {
      message.error("Failed to load user details: " + error);
    }
  }, [username, form, data, message]);

  return (
    <>
      <PageHeader title={"Edit User"} showBack />
      <Card title="Edit User" className="mx-auto shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            role: "Guest",
            status: "Active",
          }}
        >
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Role */}
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select role">
                <Option value="Admin">Admin</Option>
                <Option value="Inventory Manager">Inventory Manager</Option>
                <Option value="Supervisor">Supervisor</Option>
                <Option value="Clerk">Clerk</Option>
                <Option value="Staff">Staff</Option>
                <Option value="Auditor">Auditor</Option>
                <Option value="Guest">Guest</Option>
              </Select>
            </Form.Item>

            {/* Status */}
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select status">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
                <Option value="Suspended">Suspended</Option>
              </Select>
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
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
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

export default UserEdit;
