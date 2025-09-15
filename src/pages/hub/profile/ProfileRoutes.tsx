import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Settings from "./Settings";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default ProfileRoutes;