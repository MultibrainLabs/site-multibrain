import { Routes, Route } from "react-router-dom";
import CoursesIndex from "./CoursesIndex";
import CourseDetail from "./CourseDetail";
import CreateCourse from "./CreateCourse";

const CoursesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CoursesIndex />} />
      <Route path="/create" element={<CreateCourse />} />
      <Route path="/:id" element={<CourseDetail />} />
    </Routes>
  );
};

export default CoursesRoutes;