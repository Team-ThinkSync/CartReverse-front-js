
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <AdminHeader />

      <div className="ml-60 mt-[80px] bg-gray-200 h-screen">
        <Outlet />
      </div>

    </div>
  )
}

export default Admin;
