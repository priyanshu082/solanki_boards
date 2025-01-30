import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowNarrowDown } from "@tabler/icons-react";

interface ImageCardInfoSectionProps {
  item: {
    image: string;
    title: string;
  };
}

const ImageCardInfoSection = ({ item }: ImageCardInfoSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer w-[330px] h-[410px] relative ${isHovered ? 'bg-primary' : 'bg-transparent'}`}
      animate={{ backgroundColor: isHovered ? "bg-primary" : "bg-transparent"}}
      transition={{ duration: 0.5, ease: 'easeInOut' }}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className='w-full h-full overflow-hidden'>
      <motion.div
        className="w-full h-full bg-cover bg-center "
        style={{ backgroundImage: `url(${item.image})` }}
        animate={{ scale: isHovered ? 1.1 : 1}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      ></motion.div>
      </div>
  

      {/* Overlay and Text */}
      <motion.div
        className="absolute bottom-[-30px] left-0 w-full flex flex-col items-center justify-end p-4 "
        animate={{
          y: isHovered ? '-30%' : '0%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.p
          className="text-white text-lg font-semibold mb-2"
          animate={{ y: isHovered ? '-30%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {item.title}
        </motion.p>
        <motion.div
          className="text-white flex items-center justify-center w-10 h-10 rounded-full bg-primary"
          animate={{ y: isHovered ? '-30%' : '0%' , rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <IconArrowNarrowDown size={24} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImageCardInfoSection;
