import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-8 bg-cream-gradient" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-serif text-2xl italic tracking-wider">Our Story</span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Crafted with Tradition.<span className="text-gold-gradient">Defined by Excellence.</span>
            </h2>
            <div className="section-divider mt-2 mb-8" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              Kamala Pickles is a celebration of Telangana’s bold culinary heritage. Rooted in time-honored family recipes, our signature Chicken and Mutton Pickles are meticulously prepared using premium cuts of meat, freshly ground spices, and traditional slow-cooking techniques.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              From our kitchen to homes across Telangana and throughout India, Kamala Pickles delivers more than taste — it delivers legacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
