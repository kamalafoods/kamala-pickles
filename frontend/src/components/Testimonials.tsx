import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The mango pickle reminds me of my grandmother's recipe. Absolutely divine taste and premium quality!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    text: "Best gongura pickle I've ever tasted outside of Andhra. The spice levels are perfect.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    text: "Royal Pickle has set a new standard. The packaging is elegant and the taste is authentic. Love it!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-4 bg-background heritage-pattern" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-serif text-2xl italic tracking-wider">Love from Our Customers</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            What People <span className="text-gold-gradient">Say</span>
          </h2>
          <div className="section-divider mt-4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center p-10 rounded-2xl bg-card gold-border purple-glow">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground font-serif text-xl italic leading-relaxed mb-8">
              "{testimonials[current].text}"
            </p>
            <p className="font-heading text-lg font-semibold text-foreground">{testimonials[current].name}</p>
            <p className="text-muted-foreground text-sm font-body">{testimonials[current].location}</p>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full gold-border flex items-center justify-center text-foreground hover:bg-accent/10 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? "bg-accent scale-125" : "bg-muted"
                }`}
              />
            ))}
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full gold-border flex items-center justify-center text-foreground hover:bg-accent/10 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
