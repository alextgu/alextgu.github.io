import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Track current path
  const [activeSection, setActiveSection] = useState('Home');

  const navItems = [
    { name: 'Alex', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hobbies', href: '/hobbies' },
    { name: 'Bucket List', href: '/bucket-list' },
  ];

  return (
    <nav className="fixed top-4 left-10 z-50">
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-300/70 dark:border-zinc-700/70 rounded-lg px-2 py-1 shadow-md">
        <div className="flex items-center gap-0.5 whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setActiveSection(item.name)}
                className={`relative px-2 py-1 text-[0.875rem] rounded-md transition-colors duration-100 delay-50 ease-in-out hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 ${
                  isActive ? 'text-black dark:text-white' : 'text-gray-400 dark:text-zinc-500'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
