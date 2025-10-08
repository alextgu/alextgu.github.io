import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import SocialBar from './components/SocialBar';
import IconBar from './components/IconBar';
import Home from './components/sections/home';
import Projects from './components/sections/Projects';
import Hobbies from './components/sections/Hobbies';
import BucketList from './components/sections/BucketList';


function App() {
  return (
    <Router>
      <div className="flex items-center gap-4">
      <Sidebar />
      <IconBar />
      </div>
      <SocialBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/bucket-list" element={<BucketList />} />
      </Routes>
    </Router>
  );
}

export default App;
