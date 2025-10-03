import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SocialBar from './components/SocialBar';
import Home from './components/sections/Home';
import Projects from './components/sections/Projects';
import Hobbies from './components/sections/Hobbies';
import BucketList from './components/sections/BucketList';

function App() {
  return (
    <Router>
      <Sidebar />
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
