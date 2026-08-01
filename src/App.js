import { Routes, Route } from "react-router-dom";

import Landingpage from "./pages/landingpage/Portfolio";
import Project1 from "./pages/projects/Project1";
import Project2 from "./pages/projects/project2";
import Project3 from "./pages/projects/project3";
import Project4 from "./pages/projects/project4";
import Project5 from "./pages/projects/project5";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/project1" element={<Project1 />} />
      <Route path="/project2" element={<Project2 />} />
      <Route path="/project3" element={<Project3 />} />
      <Route path="/project4" element={<Project4 />} />
      <Route path="/project5" element={<Project5 />} />
    </Routes>
  );
}

export default App;
