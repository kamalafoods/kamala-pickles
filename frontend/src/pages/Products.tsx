import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "@/context/CartContext";

import heroMango from "@/assets/hero-mango-pickle.jpg";
import heroGongura from "@/assets/hero-gongura-pickle.jpg";
import heroGarlic from "@/assets/hero-garlic-pickle.jpg";
import productLemon from "@/assets/product-lemon.jpg";
import productChicken from "@/assets/product-chicken.jpg";
import productPrawn from "@/assets/product-prawn.jpg";

interface Variant {
  weight: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  category: "veg" | "non-veg";
  desc: string;
  variants: Variant[];
}

const allProducts: Product[] = [
  {
    id: "1",
    name: "Mango Pickle",
    image: heroMango,
    category: "veg",
    desc: "Authentic Andhra-style mango pickle crafted with handpicked spices and sun-dried perfection.",
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
    category: "veg",
    desc: "Tangy delight prepared with fresh gongura leaves and aromatic spices.",
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
    category: "veg",
    desc: "Bold garlic flavor blended with traditional Andhra masala.",
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
    category: "veg",
    desc: "Zesty lemon pickle bursting with citrusy goodness.",
    variants: [
      { weight: "250g", price: 139 },
      { weight: "500g", price: 279 },
      { weight: "1kg", price: 499 },
    ],
  },
  {
    id: "5",
    name: "Chicken Pickle",
    image: productChicken,
    category: "non-veg",
    desc: "Tender chicken pieces infused with bold spices.",
    variants: [
      { weight: "250g", price: 249 },
      { weight: "500g", price: 449 },
      { weight: "1kg", price: 849 },
    ],
  },
  {
    id: "6",
    name: "Prawn Pickle",
    image: productPrawn,
    category: "non-veg",
    desc: "Succulent prawns blended with rich traditional spices.",
    variants: [
      { weight: "250g", price: 279 },
      { weight: "500g", price: 499 },
      { weight: "1kg", price: 929 },
    ],
  },
];

const Products: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "veg" | "non-veg">("all");

  // store selected variant index per product
  const [selectedWeights, setSelectedWeights] = useState<{
    [key: string]: number;
  }>({});

  const { addToCart } = useContext(CartContext);

  const filtered =
    filter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

      const context = useContext(CartContext);
      
      if (!context) {
        return null; // or loading state
      }
    const { cartItems } = context;
      const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#67548b] via-[#5a4680] to-[#3f2f5c]">
      <Navbar />
      {/* Header */}
      <section className="pt-32 pb-2 bg-royal-gradient heritage-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-heading text-4xl tracking-wider">
            Our Collection
          </span>
          <div className="section-divider mt-4" />
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3">
          {(["all", "veg", "non-veg"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-body font-medium transition-all capitalize ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {f === "non-veg" ? "Non-Veg" : f === "all" ? "All" : "Veg"}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => {
            const selectedIndex = selectedWeights[product.id] ?? 0;
            const selectedVariant = product.variants[selectedIndex];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden bg-card gold-border hover-lift group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-4 right-4 text-xs font-body font-semibold px-3 py-1 rounded-full ${
                      product.category === "veg"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {product.category === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>

                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {product.desc}
                  </p>

                  {/* Weight Selector */}
                  <select
                    className="border rounded px-3 py-2 text-sm mb-4 w-full"
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

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-accent font-heading text-2xl font-bold">
                        ₹{selectedVariant.price}
                      </span>
                      <span className="text-muted-foreground text-sm font-body ml-2">
                        / {selectedVariant.weight}
                      </span>
                    </div>

                    <Button
                      variant="hero"
                      size="sm"
                      className="rounded-full"
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
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );

};


export default Products;