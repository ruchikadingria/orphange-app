import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';

const testimonials = [
  {
    id: 1,
    name: "Mr. Sujil Thangarajan",
    image: p1,
    text: "As a volunteer and co-founder, I'm dedicated to creating a loving and nurturing environment for our children. Witnessing their growth and happiness is truly rewarding.",
  },
  {
    id: 2,
    name: "Mr. C. Thangarajan",
    image: p2,
    text: "Being part of this orphanage has been a life-changing experience. I'm committed to providing them with the tools and support they need for a brighter future.",
  },
  {
    id: 3,
    name: "Mrs. Retnabai Thangarajan",
    image: p3,
    text: "My heart goes out to these children, and I'm honored to be able to care for them. Building a strong community around them is essential for their well-being.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="pt-45 px-4 max-w-7xl mx-auto"> {/* Added pt-24 */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Meet Our Dedicated Volunteers
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 text-lg"
        >
          The heart and soul of our orphanage.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 0.5)}
        className="relative"
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper md:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
              <motion.div
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="text-center bg-white p-6 rounded-lg shadow-md h-full flex flex-col"
                style={{ minHeight: '400px' }}
                whileHover={{ scale: 1.05, backgroundColor: '#219D80', color: 'white' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  variants={fadeIn('down', 0.4 * (index + 1))}
                  className="w-24 h-24 mx-auto mb-6"
                >
                  <motion.img
                    variants={fadeIn('up', 0.5 * (index + 1))}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <motion.h3
                  variants={textVariant(0.3)}
                  className="font-semibold text-2xl mb-4"
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p
                  variants={fadeIn('up', 0.6 * (index + 1))}
                  className="text-lg"
                >
                  {testimonial.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.div
          variants={fadeIn('up', 0.7)}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button
            variants={fadeIn('right', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            variants={fadeIn('left', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default TestimonialsSection;