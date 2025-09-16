import { Routes, Route } from "react-router-dom";
import AdminRoute from "@/components/AdminRoute";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import CourseManagement from "./CourseManagement";

const AdminRoutes = () => {
  return (
    <AdminRoute>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/courses" element={<CourseManagement />} />
      </Routes>
    </AdminRoute>
  );
};

export default AdminRoutes;