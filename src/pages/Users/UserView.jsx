import { Alert, Avatar, Card, Descriptions, Skeleton, Tag } from "antd";
import { useParams } from "react-router-dom";
import placeholder from "../../assets/no-image-placeholder.png";
import PageHeader from "./../../components/PageHeader";
import { useFetch } from "../../hooks/useFetch";
import { getUser } from "./../../api/getUser";

const UserView = () => {
  const { username } = useParams();

  const { data, loading, error } = useFetch(getUser, { username });

  if (loading)
    return (
      <>
        <PageHeader title={"View User"} showBack />
        <Skeleton.Node className="min-w-full min-h-[400px]" active />
      </>
    );

  if (error)
    return (
      <>
        <PageHeader title={"View User"} showBack />
        <Alert message={error.message} type="error" />
      </>
    );

  const profileSrc = data?.data?.profile
    ? URL.createObjectURL(data.data.profile)
    : placeholder;

  return (
    <>
      <PageHeader title={"View User"} showBack />
      <Card
        title={`User Details: ${data?.data?.fullName}`}
        className="mx-auto shadow-md"
        extra={
          <Avatar
            src={profileSrc}
            alt="Profile"
            size={84}
            style={{ border: "1px solid #ddd" }}
          />
        }
      >
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="User ID">
            {data?.data?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {data?.data?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {data?.data?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {data?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={data?.data?.role === "Admin" ? "red" : "blue"}>
              {data?.data?.role}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={data?.data?.status === "Active" ? "green" : "volcano"}>
              {data?.data?.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {data?.data?.lastLogin ? data?.data?.lastLogin : "Never"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default UserView;
