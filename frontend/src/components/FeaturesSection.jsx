import React from 'react';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const HelpUsSection = () => {
  const features = [
    {
      icon: "🍽️",
      title: "Nourish with Meals",
      description: "Provide nutritious meals to support the children's health and well-being.",
    },
    {
      icon: "👕",
      title: "Clothes",
      description: "Supply clean and comfortable clothing for children of all ages.",
    },
    {
      icon: "📚",
      title: "Empower with Education",
      description: "Support their education and provide them with the tools for a brighter future.",
    },
  ];

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 py-24"
    >
      <motion.div
        variants={fadeIn('up', 0.3)}
        className="text-center mb-16"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className="text-4xl font-bold mb-6"
        >
          Ways You Can Make a Difference
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-lg text-gray-600"
        >
          Your contribution can make a significant difference in the lives of children.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            className="flex flex-col rounded-lg shadow-md overflow-hidden p-8 items-center text-center" // Added text-center here
          >
            <motion.div
              variants={fadeIn('down', 0.4 * (index + 1))}
              className="w-28 h-28 rounded-full mb-8 flex items-center justify-center"
              style={{
                backgroundColor: index === 0 ? '#F1EFFD' :
                                 index === 1 ? '#FFE7E7' :
                                 '#FFF3E4',
              }}
            >
              <motion.div
                variants={fadeIn('up', 0.5 * (index + 1))}
                className="text-4xl"
              >
                {feature.icon}
              </motion.div>
            </motion.div>
            <motion.h3
              variants={textVariant(0.3)}
              className="text-3xl font-medium mb-4"
            >
              {feature.title}
            </motion.h3>
            <motion.p
              variants={fadeIn('up', 0.6 * (index + 1))}
              className="text-lg text-gray-500"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default HelpUsSection;