import { Routes, Route } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";

const AdminRoutes = () => {
  return (
    <AdminRoute>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </AdminRoute>
  );
};

export default AdminRoutes;