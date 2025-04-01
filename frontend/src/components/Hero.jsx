import React from 'react';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage1 from '../assets/i1.jpg';
import heroImage2 from '../assets/i2.jpg';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-60 pb-60" style={{ background: 'radial-gradient(circle at top left, rgba(220, 252, 231, 0.5), rgba(255, 255, 255, 0))' }}>
      <div className="container mx-auto bg-transparent flex flex-col md:flex-row">
        {/* Left Column - Text */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left font-playfair">
          <motion.h1 
            variants={textVariant(0.3)}
            initial="hidden"
            whileInView="show"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900" 
          >
            Make a Difference in a Child's Life
          </motion.h1>

          <motion.p 
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            className="text-gray-700 text-lg md:text-xl max-w-xl mx-auto md:mx-0"
          >
            Your small contribution can bring joy, education, and a brighter future to children in need.
          </motion.p>

          <motion.button 
            variants={fadeIn('left', 0.3)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-[#219D80] text-white px-6 py-2.5 rounded-lg hover:bg-[#187561] text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
          >
            <a href="#message">Contact Us</a>
          </motion.button>
        </div>

        {/* Right Column - Two Images with Different Levels */}
        <motion.div 
          variants={fadeIn('left', 0.5)}
          initial="hidden"
          whileInView="show"
          className="w-full md:w-1/2 mt-16 md:mt-0 flex justify-center md:justify-end gap-4 flex-wrap-nowrap"
        >
          <div className="relative w-1/2" style={{ transform: 'translateY(30px)' }}>
            <img
              src={heroImage1}
              alt="Children playing happily in an orphanage."
              className="rounded-lg w-full shadow-lg"
            />
          </div>
          <div className="relative w-1/2" style={{ transform: 'translateY(-30px)' }}>
            <img
              src={heroImage2}
              alt="Children learning in an orphanage."
              className="rounded-lg w-full shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;