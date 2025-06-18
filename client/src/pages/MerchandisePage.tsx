import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import MerchandiseCard from "@/components/MerchandiseCard";
import { MERCHANDISE } from "@/lib/constants";

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function MerchandisePage() {
  // Cart state to track items and total
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  // Add item to cart
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Placeholder checkout handler
  const handleCheckout = () => {
    // Replace with actual checkout logic (e.g., navigate to /checkout)
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Inter',sans-serif] pb-16 sm:pb-0">
      {/* Hero Section */}
      <section className="py-12  text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#cba135] mb-4">
              Raizing Sovereign Merchandise
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-black max-w-2xl mx-auto">
              Show your global citizen pride with our exclusive merchandise collection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#183b4e] text-center">
              Our Collection
            </h2>
          </motion.div>
          <div className="lg:grid lg:grid-cols-4 gap-6">
            {/* Merchandise Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MERCHANDISE.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MerchandiseCard
                      item={item}
                      onAddToCart={() =>
                        handleAddToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          icon: item.icon,
                        })
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Sidebar (Desktop) */}
            <div className="hidden sm:block lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-4">
                {/* Cart Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-sm font-bold text-[#183b4e] mb-4">Your Cart</h3>
                  <div className="flex flex-col mb-4">
                    <span className="text-xs font-semibold text-gray-600">Total</span>
                    <span className="text-base font-bold text-[#183b4e]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    className={`w-full text-white text-sm font-semibold px-4 py-2 rounded-full transition ${
                      cartTotal > 0
                        ? "bg-[#004225] hover:bg-[#00301c]"
                        : "bg-[#cba135] hover:bg-[#b08f2e]"
                    }`}
                    onClick={cartTotal > 0 ? handleCheckout : () => handleAddToCart(MERCHANDISE[0])}
                  >
                    {cartTotal > 0 ? "Checkout" : "Add to Cart"}
                  </button>
                </motion.div>

                {/* Cart Preview Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-sm font-bold text-[#183b4e] mb-4">Cart Items</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-600">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#183b4e]">{item.name}</p>
                            <p className="text-sm text-[#cba135]">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            className="text-gray-600 hover:text-[#183b4e] transition"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Footer for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#183b4e] text-white p-4 flex justify-between items-center sm:hidden z-50">
        <div className="flex flex-col">
          <span className="text-xs font-semibold">Your Cart Total</span>
          <span className="text-sm font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <button
          className={`text-white text-sm font-semibold px-4 py-2 rounded-full transition ${
            cartTotal > 0
              ? "bg-[#004225] hover:bg-[#00301c]"
              : "bg-[#cba135] hover:bg-[#b08f2e]"
          }`}
          onClick={cartTotal > 0 ? handleCheckout : () => handleAddToCart(MERCHANDISE[0])}
        >
          {cartTotal > 0 ? "Checkout" : "Add to Cart"}
        </button>
      </footer>
    </div>
  );
}