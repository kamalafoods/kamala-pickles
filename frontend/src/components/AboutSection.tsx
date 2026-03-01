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
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              A Legacy of <span className="text-gold-gradient">Flavor</span>
            </h2>
            <div className="section-divider mt-2 mb-8" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              Born in the heartland of Andhra Pradesh, Royal Pickle carries forward a century-old
              tradition of pickle making. Every jar tells a story of sun-kissed ingredients,
              stone-ground masalas, and the warmth of a family recipe.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              We believe that food is memory. Our pickles don't just add flavor to your meals —
              they bring back the taste of home, of grandmother's kitchen, of Sunday lunches
              shared with family. That's the Royal Pickle promise.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
