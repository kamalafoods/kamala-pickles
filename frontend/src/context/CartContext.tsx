import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* ---------------- TYPES ---------------- */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  weight: string; // ✅ ADDED
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increaseQty: (id: string, weight: string) => void;
  decreaseQty: (id: string, weight: string) => void;
  clearCart: () => void;
  getGrandTotal: () => number;
}

/* ---------------- CONTEXT ---------------- */

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

/* ---------------- PROVIDER ---------------- */

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /* -------- Load from localStorage -------- */
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  /* -------- Save to localStorage -------- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* -------- Add To Cart -------- */
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.weight === product.weight
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.weight === product.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* -------- Increase -------- */
  const increaseQty = (id: string, weight: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.weight === weight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* -------- Decrease -------- */
  const decreaseQty = (id: string, weight: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.weight === weight
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* -------- Clear Cart -------- */
  const clearCart = () => {
    setCartItems([]);
  };

  /* -------- Total -------- */
  const getGrandTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};