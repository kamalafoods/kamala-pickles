import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

const Cart: React.FC = () => {

const context = useContext(CartContext);

  if (!context) {
  return null; // or loading state
}

const { cartItems, increaseQty, decreaseQty, getGrandTotal, clearCart} = context;

const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  const adminNumber = "917251073544";

  const generateWhatsAppMessage = () => {
    let message = `Hello Kamala Pickle,\n\n`;
    message += `I would like to place an order for:\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    message += `\nTotal Amount: ₹${getGrandTotal()}\n\nPlease confirm my order.`;

    return encodeURIComponent(message);
  };

        const handlePlaceOrder = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/orders/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: getGrandTotal(),
              }),
            });

            const data = await response.json();

            if (data.success) {
              const orderId = data.orderId;

              // Clear Cart
              context.clearCart();

             const orderDate = new Date().toLocaleString();

            let message = `Hello Kamala Pickle,\n\n`;
            message += `My Order ID: ${orderId}\n`;

            message += `Order Details:\n`;

            cartItems.forEach((item, index) => {
              message += `${index + 1}. ${item.name}\n`;
              message += `   ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
            });

            message += `\nTotal Amount: ₹${getGrandTotal()}\n\n`;
            
            message += `Please confirm my order.`;

              const encodedMessage = encodeURIComponent(message);

              window.open(
                `https://wa.me/${adminNumber}?text=${encodedMessage}`,
                "_blank"
              );
            }
          } catch (error) {
            console.error("Order failed", error);
          }
        };

  return (
    <>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between mb-12">
        <Link to="/"><h1
        className="text-gold-gradient text-4xl font-montserrat font-bold "
            > KAMALA <span className="font-normal"> PICKLE </span>
          </h1>

          </Link>
        <Button variant="gold" size="sm" className="rounded-full">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Cart ({cartCount})
            </Button>
        </div>
        {cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 gap-8">
            <p className="text-muted-foreground text-center text-4xl font-heading">
            Your cart is empty.
            </p>

            <Link to="/products">
            <Button
                variant="gold"
                size="lg"
                className="rounded-full px-10 py-4"
            >
                Add more
            </Button>
            </Link>
        </div>
        )}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-6"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Weight: {item.weight}
                </p>

                <p>₹{item.price}</p>
                <p className="font-medium">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => decreaseQty(item.id, item.weight)}>-</Button>
              <span>{item.quantity}</span>
              <Button onClick={() => increaseQty(item.id, item.weight)}>+</Button>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <div className="text-right text-2xl font-bold mt-8">
              Grand Total: ₹{getGrandTotal()}
            </div>
          <div className="flex justify-between">
             <Link to="/products">
                <Button
                    variant="gold"
                    size="lg"
                    className="rounded-full px-8 py-3"
                >
                    Back
                </Button>
            </Link>

            <Button
               onClick={() => {
                console.log("Button Clicked");
                handlePlaceOrder();
              }}
              className="text-1xl bottom-6 right-6 bg-green-600 hover:bg-green-700 w-auto h-12 mt-2"
            >
              Place Order
            </Button>
          </div>
           
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;