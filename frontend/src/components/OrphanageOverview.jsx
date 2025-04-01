import React from 'react';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import orphanageOverviewImage from '../assets/i3.jpg'; // Replace with your orphanage overview image

const OrphanageOverview = () => {
  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="py-16 md:py-24 w-full" // Removed max-w-7xl and added w-full
      style={{ backgroundColor: 'rgba(33, 157, 128, 0.125)', minHeight: '600px' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24"> {/* Added max-w-7xl back to the inner div */}
        {/* Left side - Image */}
        <motion.div
          variants={fadeIn('right', 0.3)}
          className="w-full md:w-1/2"
        >
          <motion.img
            variants={fadeIn('up', 0.4)}
            src={orphanageOverviewImage}
            alt="Orphanage Overview, representing the care and support provided to children."
            className="w-full h-auto rounded-xl shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.alt = "Orphanage Overview (Image not available)";
              e.target.src = "https://via.placeholder.com/500";
            }}
          />
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          variants={fadeIn('left', 0.3)}
          className="w-full md:w-1/2"
          style={{ color: 'black' }}
        >
          <motion.h2
            variants={textVariant(0.5)}
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
          >
            Blessings Children Home: A Story of Hope
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.6)}
            className="text-lg leading-relaxed mb-8"
          >
            Established on June 11th, 2021, Blessings Children Home is the realization of a 20-year vision. Under the dedicated care of Pastor Sujil, his family, and their friend Sachin, we provide a safe haven for children from challenging backgrounds. Starting with seven children, we've grown to support fourteen, focusing on education, spiritual growth, and physical well-being.
          </motion.p>
          <motion.p
            variants={fadeIn('up', 0.7)}
            className="text-lg leading-relaxed mb-8"
          >
            Many of our children come from slums and streets, facing difficult circumstances such as single parenthood, financial instability, or parental addiction or incarceration. Recognizing the immense challenges these children face, we've taken the initiative to provide them with quality education and support, empowering them to build a brighter and more confident future.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OrphanageOverview;