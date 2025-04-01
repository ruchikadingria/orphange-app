import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const PurposeSection = () => {
  const features = [
    {
      icon: "❤️",
      title: "Nurturing Environment",
      description: "We provide a safe and loving home, fostering growth and development for every child.",
    },
    {
      icon: "📚",
      title: "Education & Empowerment",
      description: "We believe in the power of education, empowering children with the tools for a brighter future.",
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "We build strong community ties, ensuring children have a network of support and care.",
    },
    {
      icon: "🌟",
      title: "Building Dreams",
      description: "We encourage children to dream big and provide the resources to help them achieve their aspirations.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-24 px-4 md:px-8" // Increased py-16 to py-24
      style={{ backgroundColor: '#219D8020' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 grid-cols-1 gap-8"
        >
          <motion.div variants={fadeIn("right", 0.3)}>
            <motion.div
              variants={fadeIn("up", 0.4)}
              className="text-sm text-[#219D80] font-medium mb-2"
            >
              OUR MISSION
            </motion.div>
            <motion.h2
              variants={textVariant(0.5)}
              className="text-3xl md:w-4/5 md:text-4xl font-bold text-gray-900"
            >
              Empowering Children, Transforming Lives.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.3)}
            className="col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.3 * (index + 1))}
                className="flex items-start space-x-4"
              >
                <motion.div
                  variants={fadeIn("right", 0.4 * (index + 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-lg"
                >
                  <span className="text-2xl">{feature.icon}</span>
                </motion.div>
                <motion.div variants={fadeIn("left", 0.4 * (index + 1))}>
                  <motion.h3
                    variants={textVariant(0.3)}
                    className="text-xl font-semibold text-gray-900 mb-2"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeIn("up", 0.4)}
                    className="text-gray-600"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PurposeSection;