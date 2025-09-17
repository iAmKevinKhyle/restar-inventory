import { Alert } from "antd";
import getStocksMovementData from "../../api/getStocksMovementData";
import { useFetch } from "../../hooks/useFetch";
import StockMovementTable from "./StockMovementTable";

const AllMovements = () => {
  const { data, loading, error } = useFetch(getStocksMovementData);

  if (error)
    return <Alert message={"Getting stock movement failed!"} type="error" />;

  return (
    <>
      <StockMovementTable data={data} loading={loading} />
    </>
  );
};

export default AllMovements;
