import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 

const MangoContext = createContext();

export function MangoProvider({ children }) {
  const [collected, setCollected] = useState([]);
  const [showMangoModal, setShowMangoModal] = useState(false); // modal state

  // Load collected mangos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('collectedMangos');
    if (stored) setCollected(JSON.parse(stored));
  }, []);

  // Save collected mangos to localStorage
  useEffect(() => {
    localStorage.setItem('collectedMangos', JSON.stringify(collected));
  }, [collected]);

  const collectMango = (id) => {
    if (!collected.includes(id)) {
      setCollected((prev) => [...prev, id]);
      toast.success('🥭 You found a mango!');
    }
  };

  const isCollected = (id) => collected.includes(id);

  return (
    <MangoContext.Provider
      value={{
        collected,
        collectMango,
        isCollected,
        showMangoModal,
        setShowMangoModal, // allow global control
      }}
    >
      {children}
    </MangoContext.Provider>
  );
}

export function useMango() {
  return useContext(MangoContext);
}
