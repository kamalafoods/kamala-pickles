import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import heroMango from "@/assets/hero-mango-pickle.jpg";
import heroGongura from "@/assets/hero-gongura-pickle.jpg";
import heroGarlic from "@/assets/hero-garlic-pickle.jpg";

const slides = [
  {
    image: heroMango,
    name: "Mango Pickle",
    tagline: "Authentic Andhra-style mango pickle crafted with handpicked spices and sun-dried perfection.",
    price: "₹299 / 500g",
  },
  {
    image: heroGongura,
    name: "Gongura Pickle",
    tagline: "A tangy, spicy delight made from fresh sorrel leaves and traditional stone-ground masalas.",
    price: "₹349 / 500g",
  },
  {
    image: heroGarlic,
    name: "Garlic Pickle",
    tagline: "Bold, aromatic garlic cloves infused with premium cold-pressed oil and spices.",
    price: "₹329 / 500g",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].name}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl"
            >
              {/* <span className="inline-block text-gold font-serif text-lg italic mb-3 tracking-wider mt-2">
                Premium Collection
              </span> */}
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-cream mb-4 leading-tight">
                {slides[current].name}
              </h1>
              <p className="text-cream/80 font-body text-lg md:text-xl mb-4 leading-relaxed max-w-md">
                {slides[current].tagline}
              </p>
              <p className="text-gold-gradient font-heading text-3xl font-bold mb-8">
                {slides[current].price}
              </p>
              <div className="flex gap-4">
                <Link to="/products">
                  <Button variant="gold" size="xl" className="rounded-full">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="gold-outline" size="xl" className="rounded-full border-cream/40 text-cream hover:bg-cream/10 hover:text-cream">
                    Explore All
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-cream hover:bg-gold/20 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-cream hover:bg-gold/20 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-gold" : "w-4 bg-cream/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
