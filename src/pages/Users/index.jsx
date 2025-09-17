import { Route, Routes } from "react-router-dom";
import UsersTable from "./UsersTable";
import NotFound from "../../NotFound";
import { theme } from "antd";
import UserAdd from "./UserAdd";
import UserView from "./UserView";
import UserEdit from "./UserEdit";

const Users = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();

  return (
    <div
      className="p-6 min-h-full"
      style={{ backgroundColor: colorBorderSecondary }}
    >
      <Routes>
        <Route index element={<UsersTable />} />
        <Route path="add" element={<UserAdd />} />
        <Route path=":username/view" element={<UserView />} />
        <Route path=":username/edit" element={<UserEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Users;
