import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

import image1 from '../assets/g1.jpg';
import image2 from '../assets/g8.jpg';
import image3 from '../assets/g3.jpg';
import image4 from '../assets/g7.jpg';
import image5 from '../assets/g9.jpg';
import image6 from '../assets/g6.jpg';

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
];

const PhotoGallery = () => {
  return (
    <section id="gallery" className="pt-40 px-4 max-w-7xl mx-auto"> {/* Changed py-16 to pt-24 */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Our Photo Gallery
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 text-lg"
        >
          A glimpse into the joy and moments we cherish.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 0.6 + index * 0.1)}
            className="rounded-lg overflow-hidden shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PhotoGallery;