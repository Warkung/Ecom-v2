import { Minus, Plus, ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecomStore";
import type { Product } from "../../interface/ecomStore";
import { motion } from "motion/react";

export default function ProductCard({ product }: { product: Product }) {
  const { actionAddToCart, carts, actionUpdateQuantity, actionRemoveFromCart } =
    useEcomStore((state) => state);

  const cartItem = carts.find((cart) => cart.id === product.id);
  const quantityInCart = cartItem ? cartItem.count : 0;

  const handleDecrement = () => {
    if (quantityInCart > 1) {
      actionUpdateQuantity(product.id, quantityInCart - 1);
    } else {
      // When quantity is 1, remove it from the cart
      actionRemoveFromCart(product.id);
    }
  };

  const handleIncrement = () => {
    // Check against product stock before incrementing
    if (quantityInCart < product.quantity) {
      actionUpdateQuantity(product.id, quantityInCart + 1);
    }
  };

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      actionAddToCart(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <div className="bg-stone-50 border border-stone-200 rounded-lg shadow-lg p-4 transition-shadow hover:shadow-xl w-48">
        <div>
          <div className="flex justify-center items-center w-full h-32 bg-stone-200 rounded-md text-center shadow-inner text-stone-500">
            {product.images.length > 0 ? (
              <a href={product.images[0].url}>
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="w-40 h-32 rounded-md "
                  loading="lazy"
                />
              </a>
            ) : (
              "No Image"
            )}
          </div>
        </div>
        <div className="mt-4 h-20">
          <p className="font-bold text-xl text-stone-800 text-nowrap overflow-hidden">
            {product.title}
          </p>
          <p className="text-stone-600 text-sm mt-1 text-nowrap overflow-hidden">
            {product.description}
          </p>
          <p
            className={`text-xs mt-1 ${
              product.quantity > 0
                ? "text-stone-500"
                : "text-red-500 font-semibold"
            }`}
          >
            {product.quantity > 0
              ? `Stock: ${product.quantity}`
              : "Out of Stock"}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-md text-stone-800">
            {product.price.toLocaleString()}
          </span>
          {quantityInCart === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="bg-stone-700 hover:bg-stone-800 text-white p-2 rounded-full shadow-md hover:cursor-pointer hover:scale-120 duration-300 ease-in-out transition-all disabled:bg-stone-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              <ShoppingCart />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="bg-stone-700 hover:bg-stone-800 text-white p-1 rounded-full shadow-md hover:cursor-pointer hover:scale-110 duration-300 ease-in-out transition-all"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-lg text-stone-800">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantityInCart >= product.quantity}
                className="bg-stone-700 hover:bg-stone-800 text-white p-1 rounded-full shadow-md hover:cursor-pointer hover:scale-110 duration-300 ease-in-out transition-all disabled:bg-stone-400 disabled:cursor-not-allowed disabled:scale-100"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
