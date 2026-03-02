import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import traditionalImg from "@/assets/traditional-making.jpg";

const TraditionalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-8 bg-royal-gradient heritage-pattern relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden gold-border gold-glow">
              <img
                src={traditionalImg}
                alt="Traditional pickle making"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold font-serif text-2xl italic tracking-wider">Heritage & Tradition</span>
            <h2 className="font-heading text-4xl md:text-4xl font-bold text-black-gradient mt-3 mb-6">
              Made the Way <br />
              <span className="text-gold-gradient">Our Grandmothers Did</span>
            </h2> 
            
            <div className="section-divider !mx-0 mb-8" />
            <p className="text-black/80 font-body text-lg leading-relaxed mb-6">
              From our kitchen to homes across Telangana and throughout India, Kamala Pickles delivers more than taste — it delivers legacy.
            </p>
            <p className="text-black/80 font-body leading-relaxed">
              Every batch is prepared with love by local artisans who have inherited recipes passed
              down through generations. We believe in preserving the authentic taste of India.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TraditionalSection;

