import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import kamalaLogo from "../assets/kamala.jpg";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  // { label: "Login", path: "/login" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFeaturedProductsVisible, setIsFeaturedProductsVisible] =
    useState(false);
  const location = useLocation();

  // show cart icon on mobile when featured products section is visible or we're on products page
  const showMobileCart =
    isFeaturedProductsVisible || location.pathname === "/products";


  const context = useContext(CartContext);
  const cartCount = context
    ? context.cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeaturedProductsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const featuredProductsElement =
      document.getElementById("featured-products");
    if (featuredProductsElement) {
      observer.observe(featuredProductsElement);
    }

    return () => {
      if (featuredProductsElement) {
        observer.unobserve(featuredProductsElement);
      }
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-royal-purple-dark/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-2">
        <Link
          to="/"
          className="flex flex-col items-center justify-between gap-2"
        >
          {!isScrolled && (
            <img
              src={kamalaLogo}
              alt="Kamala Pickle Logo"
              className="w-auto items-center h-16 rounded-full  transition-all duration-300"
            />
          )}

          <span
            className={`mt-2 text-gold-gradient font-montserrat font-bold tracking-wide transition-all duration-300 mb-2 ${
              isScrolled ? "text-xl" : "text-2xl md:text-3xl"
            }`}
          >
            KAMALA <span className="font-normal"> PICKLE </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-primary-foreground/80 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart">
            <Button variant="gold" size="sm" className="rounded-full">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Cart ({cartCount})
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <AnimatePresence>
            {showMobileCart && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/cart">
                  <Button variant="gold" size="sm" className="rounded-full">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="ml-1 text-xs">{cartCount}</span>
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-primary-foreground"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-royal-purple-dark/98 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-lg tracking-wide py-2 border-b border-primary-foreground/10 ${
                    location.pathname === link.path
                      ? "text-gold"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
