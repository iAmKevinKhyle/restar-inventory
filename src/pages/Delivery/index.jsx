import { Route, Routes } from "react-router-dom";
import NotFound from "../../NotFound";
import DeliveryIndex from "./DeliveryIndex";
import DeliveryCreate from "./DeliveryCreate";
import DeliveryInitial from "./DeliveryInitial";
import DeliveryDelivered from "./DeliveryDelivered";
import DeliveryInTransit from './DeliveryInTransit';

const Delivery = () => {
  return (
    <>
      <Routes>
        <Route index element={<DeliveryIndex />} />

        <Route path="create" element={<DeliveryCreate />} />
        <Route path="initial" element={<DeliveryInitial />} />
        <Route path="in-transit" element={<DeliveryInTransit />} />
        <Route path="delivered" element={<DeliveryDelivered />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Delivery;
