import { Routes, Route } from "react-router-dom";
import FindMentors from "./FindMentors";
import MySessions from "./MySessions";
import BecomeMentor from "./BecomeMentor";

const MentorshipRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FindMentors />} />
      <Route path="/find" element={<FindMentors />} />
      <Route path="/sessions" element={<MySessions />} />
      <Route path="/become-mentor" element={<BecomeMentor />} />
    </Routes>
  );
};

export default MentorshipRoutes;