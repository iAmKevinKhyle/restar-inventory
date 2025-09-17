import { Menu, theme } from "antd";
import {
  BarChartOutlined,
  ShoppingCartOutlined,
  AppstoreAddOutlined,
  StockOutlined,
  TruckOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <BarChartOutlined />,
  },
  {
    label: "Products",
    key: "/products",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "Categories",
    key: "/categories",
    icon: <AppstoreAddOutlined />,
  },
  {
    label: "Inventory Stocks",
    icon: <StockOutlined />,
    children: [
      {
        label: "All Movements",
        key: "/stocks",
      },
      {
        label: "Stock In",
        key: "/stocks/in",
      },
      {
        label: "Stock Out",
        key: "/stocks/out",
      },
    ],
  },
  {
    label: "Delivery",
    key: "/delivery",
    icon: <TruckOutlined />,
  },
  {
    label: "Invoice",
    key: "/invoice",
    icon: <FileDoneOutlined />,
  }
];

const MenuItems = ({ setDrawerVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  const navigateKey = (e) => {
    navigate(e.key);
    if (setDrawerVisible) setDrawerVisible(false);
  }

  const currentPath =
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname;

  return (
    <Menu
      mode="inline"
      selectedKeys={[currentPath]}
      defaultSelectedKeys={["/dashboard"]}
      className="mt-8 flex flex-col gap-2 relative"
      items={items}
      onClick={navigateKey}
      style={{ 
        background: colorBgBase,
        color: colorTextBase,
        borderRight: "none",
       }}
    />
  );
};

export default MenuItems;
