import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SocialBar from './components/SocialBar';
import Home from './components/sections/home';
import Projects from './components/sections/projectfolder/Projects';
import Hobbies from './components/sections/Hobbies';
import BucketList from './components/sections/BucketList';
import Computer from './components/computer/Computer';
import ProjectAWeek from './components/sections/projectfolder/projectaweek'; 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <NavBar />
      <SocialBar className="hidden md:flex" />

      {/* Global Toast System */}
      <Toaster
  position="bottom-right"
  toastOptions={{
    duration: 2500,
    style: {
      background: 'transparent',  // remove background
      boxShadow: 'none',          // remove shadow
      padding: 0,                 // remove padding
      border: 'none',             // remove border
      color: 'inherit',           // use site text color
      fontWeight: 300, 
      fontFamily: 'inherit',      // match site font
    },
  }}
/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/bucket-list" element={<BucketList />} />
        <Route path="/computer" element={<Computer />} />
        <Route path="/projectaweek" element={<ProjectAWeek />} />
      </Routes>
    </Router>
  );
}

export default App;
