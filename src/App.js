import { Routes, Route } from "react-router-dom";

import Landingpage from "./pages/landingpage/Portfolio";
import Project1 from "./pages/projects/Project1";


function App() {
  return (

   
    <Routes>
      
      <Route path="/" element={<Landingpage />} />
      <Route path="/project1" element={<Project1 />} />
      
    </Routes>
    
  );
}

export default App;
