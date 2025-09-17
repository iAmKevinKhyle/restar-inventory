import { theme } from "antd";
import { Route, Routes } from "react-router-dom";
import ProductTable from "./ProductTable";
import ProductAddForm from "./ProductAddForm";
import ProductEditForm from "./ProductEditForm";
import NotFound from "../../NotFound";
import ProductViewPage from "./ProductViewPage";

const Products = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div
      className="p-6 min-h-full"
      style={{ backgroundColor: colorBorderSecondary }}
    >
      <Routes>
        <Route index element={<ProductTable />} />

        <Route path="add" element={<ProductAddForm />} />
        <Route path=":id/view" element={<ProductViewPage />} />
        <Route path=":id/edit" element={<ProductEditForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Products;
