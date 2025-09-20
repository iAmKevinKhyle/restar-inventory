import { Route, Routes } from "react-router-dom";
import { theme } from "antd";
import NotFound from "../../NotFound";
import DeliveryCreate from "./DeliveryCreate";
import DeliveryInitial from "./DeliveryInitial";
import DeliveryDelivered from "./DeliveryDelivered";
import DeliveryInTransit from "./DeliveryInTransit";
import DeliveryView from "./DeliveryView";
import DeliveryEdit from "./DeliveryEdit";

const Delivery = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div
      className="p-6 min-h-full"
      style={{ backgroundColor: colorBorderSecondary }}
    >
      <Routes>
        <Route path="create" element={<DeliveryCreate />} />
        <Route path="initial" element={<DeliveryInitial />} />
        <Route path="in-transit" element={<DeliveryInTransit />} />
        <Route path="delivered" element={<DeliveryDelivered />} />

        <Route path=":id/view" element={<DeliveryView />} />
        <Route path=":id/edit" element={<DeliveryEdit />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Delivery;
