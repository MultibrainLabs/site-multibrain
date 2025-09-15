import { Routes, Route } from "react-router-dom";
import CommunityFeed from "./CommunityFeed";
import Groups from "./Groups";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";

const CommunityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CommunityFeed />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/profile/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default CommunityRoutes;