import { motion, useInView } from "framer-motion";
import { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";

import heroMango from "@/assets/hero-mango-pickle.jpg";
import heroGongura from "@/assets/hero-gongura-pickle.jpg";
import heroGarlic from "@/assets/hero-garlic-pickle.jpg";
import productLemon from "@/assets/product-lemon.jpg";

/* ---------------- Types ---------------- */

interface Variant {
  weight: string;
  price: number;
}

interface FeaturedProduct {
  id: string;
  name: string;
  image: string;
  tag: string;
  variants: Variant[];
}

/* ---------------- Products ---------------- */

const products: FeaturedProduct[] = [
  {
    id: "1",
    name: "Mango Pickle",
    image: heroMango,
    tag: "Bestseller",
    variants: [
      { weight: "250g", price: 149 },
      { weight: "500g", price: 299 },
      { weight: "1kg", price: 549 },
    ],
  },
  {
    id: "2",
    name: "Gongura Pickle",
    image: heroGongura,
    tag: "Popular",
    variants: [
      { weight: "250g", price: 169 },
      { weight: "500g", price: 349 },
      { weight: "1kg", price: 649 },
    ],
  },
  {
    id: "3",
    name: "Garlic Pickle",
    image: heroGarlic,
    tag: "Spicy",
    variants: [
      { weight: "250g", price: 159 },
      { weight: "500g", price: 329 },
      { weight: "1kg", price: 599 },
    ],
  },
  {
    id: "4",
    name: "Lemon Pickle",
    image: productLemon,
    tag: "New",
    variants: [
      { weight: "250g", price: 139 },
      { weight: "500g", price: 279 },
      { weight: "1kg", price: 499 },
    ],
  },
];

const FeaturedProducts: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const context = useContext(CartContext);
  if (!context) return null;

  const { addToCart } = context;

  // Store selected weight index per product
  const [selectedWeights, setSelectedWeights] = useState<{
    [key: string]: number;
  }>({});

  return (
    <section className="py-8 bg-cream-gradient" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-serif text-lg italic tracking-wider">
            Handpicked for You
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Featured <span className="text-gold-gradient">Collection</span>
          </h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => {
            const selectedIndex = selectedWeights[product.id] ?? 0;
            const selectedVariant = product.variants[selectedIndex];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl overflow-hidden bg-card gold-border hover-lift group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-body text-xl font-semibold text-foreground mb-3">
                    {product.name}
                  </h3>

                  {/* Weight Selector */}
                  <select
                    className="w-full border rounded px-3 py-2 text-sm mb-3"
                    value={selectedIndex}
                    onChange={(e) =>
                      setSelectedWeights({
                        ...selectedWeights,
                        [product.id]: Number(e.target.value),
                      })
                    }
                  >
                    {product.variants.map((variant, index) => (
                      <option key={index} value={index}>
                        {variant.weight} - ₹{variant.price}
                      </option>
                    ))}
                  </select>

                  {/* Dynamic Price */}
                  <p className="text-accent font-body text-xl font-bold mb-4">
                    ₹{selectedVariant.price}
                  </p>

                  {/* Add to Cart */}
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full rounded-full"
                    onClick={() =>
                      addToCart({
                        id: product.id + "-" + selectedVariant.weight,
                        name: product.name,
                        price: selectedVariant.price,
                        weight: selectedVariant.weight,
                        image: product.image,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="gold-outline" size="lg" className="rounded-full">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;