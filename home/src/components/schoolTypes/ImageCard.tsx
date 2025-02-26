import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageCardProps {
  item: {
    image: string;
    desc1: string;
    desc2?: string;
  };
}

const ImageCard = ({ item }: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="cursor-pointer w-full h-[310px] overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.div
        className="w-full h-full bg-cover bg-center "
        style={{ backgroundImage: `url(${item.image})` }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      ></motion.div>

      {/* Overlay and Text */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-background/30"
        animate={{
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.6)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.p
          className="text-white text-md font-bold flex flex-col items-center justify-center font-mono"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {item.desc1}
          <span className="">{item.desc2}</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ImageCard;
