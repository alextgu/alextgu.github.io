import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // ✅ Combined component
import SocialBar from './components/SocialBar';
import Home from './components/sections/home';
import Projects from './components/sections/Projects';
import Hobbies from './components/sections/Hobbies';
import BucketList from './components/sections/BucketList';
import Computer from './components/computer/Computer';

function App() {
  return (
    <Router>
      <NavBar />
      {/* SocialBar will only show on large screens and above */}
      <SocialBar className="hidden md:flex" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/bucket-list" element={<BucketList />} />
        <Route path="/computer" element={<Computer />} />
      </Routes>
    </Router>
  );
}


export default App;
