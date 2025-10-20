import { useMango } from '@/context/MangoContext';
import { motion } from 'framer-motion';

function Mango({ id, position }) {
  const { collectMango, isCollected } = useMango();

  const handleClick = () => {
    if (!isCollected(id)) {
      collectMango(id);
    }
  };

  return (
    <motion.div
      className={`absolute text-3xl cursor-pointer select-none ${
        isCollected(id) ? 'opacity-40 grayscale' : 'hover:scale-125'
      }`}
      onClick={handleClick}
      style={{
        top: position?.top ?? '50%',
        left: position?.left ?? '50%',
        transform: 'translate(-50%, -50%)',
      }}
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
    >
      🥭
    </motion.div>
  );
}

export default Mango;
