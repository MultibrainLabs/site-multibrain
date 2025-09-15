import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import HubLayout from "./HubLayout";
import Dashboard from "./Dashboard";
import CoursesRoutes from "./courses/CoursesRoutes";
import CommunityRoutes from "./community/CommunityRoutes";
import MentorshipRoutes from "./mentorship/MentorshipRoutes";
import ProfileRoutes from "./profile/ProfileRoutes";

const HubApp = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <HubLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses/*" element={<CoursesRoutes />} />
            <Route path="/community/*" element={<CommunityRoutes />} />
            <Route path="/mentorship/*" element={<MentorshipRoutes />} />
            <Route path="/profile/*" element={<ProfileRoutes />} />
          </Routes>
        </HubLayout>
      </div>
    </SidebarProvider>
  );
};

export default HubApp;