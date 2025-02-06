import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowNarrowDown } from "@tabler/icons-react";

type ImageType = string | { default: string };

interface ImageCardInfoSectionProps {
  item: {
    image: ImageType;
    title: string;
    description?: string;
  };
}

const ImageCardInfoSection = ({ item }: ImageCardInfoSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="cursor-pointer w-[330px] h-[410px] relative rounded-lg overflow-hidden border-2 border-primary bg-white shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full p-6 flex flex-col justify-between">
        <motion.h3
          className="text-primary text-2xl font-semibold text-center mt-4"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="text-gray-700 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.description}
        </motion.p>

        <motion.div
          className="flex justify-center mb-4"
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <IconArrowNarrowDown size={24} className="text-white" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImageCardInfoSection;