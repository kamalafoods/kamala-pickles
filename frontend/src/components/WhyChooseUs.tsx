import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, ShieldCheck, Hand, Truck } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Natural Ingredients", desc: "Only the freshest, purest ingredients make it into our jars." },
  { icon: ShieldCheck, title: "No Preservatives", desc: "Naturally fermented and preserved using traditional techniques." },
  { icon: Hand, title: "Handmade in Small Batches", desc: "Every jar is crafted with personal care and attention." },
  { icon: Truck, title: "Pan-India Delivery", desc: "From our kitchen to your doorstep, anywhere in India." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-4 bg-background heritage-pattern" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-serif italic tracking-wider text-2xl">Our Promise</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Why Choose <span className="text-gold-gradient">Kamala Pickle</span>
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-card gold-border hover-lift group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
