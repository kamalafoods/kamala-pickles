import { motion, useInView } from "framer-motion";
import { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";

import heroMango from "@/assets/hero-mango-pickle.jpg";
import heroGongura from "@/assets/hero-gongura-pickle.jpg";
import heroGarlic from "@/assets/hero-garlic-pickle.jpg";
import productLemon from "@/assets/product-lemon.jpg";
import productChicken from "@/assets/product-chicken.jpg";
import productMutton from "@/assets/product-mutton.jpg";
import productKakarakaya from "@/assets/product-kakarakaya.jpg";

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
  available: boolean;
  variants: Variant[];
}

/* ---------------- Products ---------------- */

const products: FeaturedProduct[] = [
  {
    id: "1",
    name: "Chicken Pickle (Boneless)",
    image: productChicken,
    tag: "Popular",
    available: true,
    variants: [
      { weight: "250g", price: 380 },
      { weight: "500g", price: 710 },
      { weight: "1kg", price: 1400 },
    ],
  },
  {
    id: "2",
    name: "Mutton Pickle (Boneless)",
    image: productMutton,
    tag: "Tasty",
    available: true,
    variants: [
      { weight: "250g", price: 570 },
      { weight: "500g", price: 1130 },
      { weight: "1kg", price: 2160 },
    ],
  },

  {
    id: "3",
    name: "Karela Pickle",
    image: productKakarakaya,
    tag: "Spicy",
    available: true,
    variants: [
      { weight: "250g", price: 180 },
      { weight: "500g", price: 325 },
      { weight: "1kg", price: 580 },
    ],
  },
  {
    id: "4",
    name: "Lemon Pickle",
    image: productLemon,
    tag: "New",
    available: false,
    variants: [
      { weight: "250g", price: 149 },
      { weight: "500g", price: 249 },
      { weight: "1kg", price: 499 },
    ],
  },
];

const FeaturedProducts: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Store selected weight index per product
  const [selectedWeights, setSelectedWeights] = useState<{
    [key: string]: number;
  }>({});

  const context = useContext(CartContext);
  if (!context) return null;

  const { addToCart, decreaseQty, cartItems } = context;

  return (
    <section
      className="py-8 bg-cream-gradient"
      ref={ref}
      id="featured-products"
    >
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
            const currentItemId = product.id + "-" + selectedVariant.weight;
            const cartItem = cartItems.find(
              (item) => item.id === currentItemId,
            );
            const currentQuantity = cartItem?.quantity ?? 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-2xl overflow-hidden bg-card gold-border hover-lift group"
              >
                {/* Blur Overlay */}
                {!product.available && (
                  <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <span className="text-white text-2xl text-center font-bold tracking-wider">
                      Flavor in the Making...
                    </span>
                  </div>
                )}

                {/* Entire Content Wrapper */}
                <div
                  className={`${!product.available ? "blur-sm pointer-events-none select-none" : ""}`}
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
                      disabled={!product.available}
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

                    {/* Price */}
                    <p className="text-accent font-body text-xl font-bold mb-4">
                      ₹{selectedVariant.price}
                    </p>

                    {/* Add to Cart / Quantity Control */}
                    {currentQuantity === 0 ? (
                      <Button
                        variant="hero"
                        size="sm"
                        disabled={!product.available}
                        className="w-full rounded-full"
                        onClick={() => {
                          addToCart({
                            id: currentItemId,
                            name: product.name,
                            price: selectedVariant.price,
                            weight: selectedVariant.weight,
                            image: product.image,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-3 border rounded-full px-3 py-3 bg-hero text-hero-foreground">
                        <button
                          type="button"
                          onClick={() => {
                            decreaseQty(currentItemId, selectedVariant.weight);
                          }}
                          className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30 transition-colors touch-none"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center font-semibold text-sm">
                          {currentQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart({
                              id: currentItemId,
                              name: product.name,
                              price: selectedVariant.price,
                              weight: selectedVariant.weight,
                              image: product.image,
                            });
                          }}
                          className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30 transition-colors touch-none"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
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
