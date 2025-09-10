import { BrushCleaning, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useEcomStore from "../../../store/ecomStore";

function CartCard() {
  const {
    carts,
    actionUpdateQuantity,
    actionRemoveFromCart,
    actionClearCart,
    getTotalPrice,
  } = useEcomStore((state) => state);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          {carts.length > 0 && `${carts.length} Selected Items`}
        </h1>
        {carts.length > 0 && (
          <button
            disabled={carts.length === 0}
            onClick={actionClearCart}
            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full text-red-600 hover:text-red-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <BrushCleaning size={24} />
            <span className="font-bold">Clear</span>
          </button>
        )}
      </div>
      {/* border card */}
      <div className=" border px-4 py-2 rounded-xl">
        {/* Card */}
        {carts.map((cart, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
            {/*Row1*/}
            <div className="flex justify-between mb-2">
              {/*Row1 left */}
              <div className="flex gap-2 items-center">
                {/* img */}
                <div className="w-20 h-20 shadow bg-gray-200 rounded-md text-center flex justify-center items-center">
                  {cart.images.length !== 0 ? (
                    <img
                      src={cart.images[0].url}
                      className="w-full h-full rounded-md"
                      alt={cart.title}
                    />
                  ) : (
                    <span className="text-gray-500 text-sm ">No Image</span>
                  )}
                </div>
                {/* text */}
                <div>
                  <p className="font-bold text-gray-600 text-nowrap overflow-hidden w-28">
                    {cart.title}
                  </p>
                  {/* <p className="text-gray-500 text-sm text-nowrap overflow-hidden w-28">
                    {cart.description}
                  </p> */}
                </div>
              </div>
              {/*Row1 Right */}
              <div
                onClick={() => actionRemoveFromCart(cart.id)}
                className="text-red-700 p-2 hover:cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out "
              >
                <Trash2 size={20} />
              </div>
            </div>

            {/*Row2*/}
            <div className="flex justify-between">
              {/* Row2 left */}
              <div className="flex justify-center items-center w-20 h-6 rounded text-xs ">
                <button
                  disabled={cart.count <= 1}
                  onClick={() => actionUpdateQuantity(cart.id, cart.count - 1)}
                  className=" bg-gray-300 mx-0.5 px-0.5 py-0.25 text-white rounded-md hover:cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-200"
                >
                  <Minus size={18} />
                </button>
                <span className="w-xl text-gray-600 text-center text-[16px] font-semibold">
                  {cart.count}
                </span>
                <button
                  onClick={() => actionUpdateQuantity(cart.id, cart.count + 1)}
                  className=" bg-gray-300 mx-0.5 px-0.5 py-0.25 text-white rounded-md hover:cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out"
                >
                  <Plus size={18} />
                </button>
              </div>
              {/* Row2 right */}
              <div className="font-bold text-blue-500 px-2">
                ${(cart.price * cart.count).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {/* Total */}
        <div className="flex justify-between px-2 mt-2">
          <span>Total:</span>
          <span>{getTotalPrice().toLocaleString()}</span>
        </div>

        {/* Button */}
        <Link
          to={"/cart"}
          className={carts.length === 0 ? "pointer-events-none" : ""}
        >
          {carts.length === 0 ? (
            <button
              className="text-sm font-bold shadow w-full mt-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:cursor-not-allowed hover:bg-gray-500 transition-all duration-300 ease-in-out"
              disabled
            >
              Cart is Empty
            </button>
          ) : (
            <button className="text-sm font-bold shadow w-full mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-green-500 transition-all duration-300 ease-in-out">
              Proceed with payment
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
export default CartCard;
