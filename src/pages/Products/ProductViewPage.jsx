import { Alert, Card, Descriptions, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/getProduct";
import { useFetch } from "../../hooks/useFetch";
import placeholder from "../../assets/no-image-placeholder.png";
import PageHeader from "./../../components/PageHeader";

const ProductViewPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(getProduct, { id });

  if (loading)
    return (
      <>
        <PageHeader title={"View Product"} showBack />
        <Skeleton.Node className="min-w-full min-h-[400px]" active />
      </>
    );
    
  if (error)
    return (
      <>
        <PageHeader title={"View Product"} showBack />
        <Alert message={error.message} type="error" />
      </>
    );

  return (
    <>
      <PageHeader title={"View Product"} showBack />

      <Card title={`${data.data.name} - Product Details`} variant={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <img
              src={placeholder}
              alt={data?.data?.name || "No Image"}
              className="rounded-lg shadow-md max-w-full h-auto object-cover object-center"
            />
          </div>

          <div className="md:col-span-2">
            <Descriptions
              bordered
              column={1}
              size="middle"
              styles={{ fontWeight: "bold", width: "200px" }}
            >
              <Descriptions.Item label="Product ID">
                {data.data.product_id}
              </Descriptions.Item>
              <Descriptions.Item label="Barcode">
                {data.data.barcode}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {data.data.category}
              </Descriptions.Item>
              <Descriptions.Item label="Supplier">
                {data.data.supplier}
              </Descriptions.Item>
              <Descriptions.Item label="Unit of Measure">
                {data.data.unit}
              </Descriptions.Item>
              <Descriptions.Item label="Cost Price">
                ₱{data.data.cost_price}
              </Descriptions.Item>
              <Descriptions.Item label="Selling Price">
                ₱{data.data.selling_price}
              </Descriptions.Item>
              <Descriptions.Item label="Stock Quantity">
                {data.data.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Reorder Point">
                {data.data.reorder_level}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {data.data.status}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {data.data.description || "No Description"}
              </Descriptions.Item>
              <Descriptions.Item label="Expiry Date">
                {data.data.expiry_date || "No Expiry"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductViewPage;
