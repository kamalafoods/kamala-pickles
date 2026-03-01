import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-royal-gradient relative overflow-hidden " ref={ref}>
      <div className="absolute inset-0 heritage-pattern opacity-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <span className="text-gold font-serif text-2xl italic tracking-wider">Ready to Experience Tradition?</span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-gold-gradient mt-4 mb-6">
          Taste <span className="text-gold-gradient">Tradition</span> Today
        </h2>
        <p className="text-cream/70 font-body text-lg max-w-lg mx-auto mb-10">
          Order now and discover the authentic flavors of India, delivered fresh to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button variant="gold" size="xl" className="rounded-full">
              Shop Collection
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
