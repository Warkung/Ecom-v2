import { ListCheck, Reply } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useEcomStore from "../../store/ecomStore";
import { createUserCart } from "../../api/user";

function ListCart() {
  const { getTotalPrice, user, token, carts } = useEcomStore((state) => state);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    try {
      token && (await createUserCart(token, { cart: carts }));
      // Optionally, you can redirect the user or perform other actions
      navigate("/checkout");
    } catch (error: any) {
      console.error("Error saving cart:", error);
      // Optionally, you can show a notification or alert to the user
      if (error.response.data === "Token Expired") {
        toast.error("Login expired, please login again", {
          position: "bottom-right",
          autoClose: 3000,
        });
        navigate("/login");
        return;
      }
      toast.warn(error.response?.data || "Failed to save cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      {/* Header */}
      <div className="rounded-xl bg-gray-300 p-4 shadow">
        <div className="flex gap-2 items-center mb-4 text-gray-800">
          <ListCheck size={24} />
          <p className="text-lg sm:text-xl font-bold text-gray-800">
            Product list, {carts.length} items
          </p>
        </div>
        {/*Cart Body*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Card */}
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="bg-white p-2 rounded-md shadow-md mb-2"
              >
                {/*Row1*/}
                <div className="flex justify-between items-start sm:items-center gap-2">
                  {/*Row1 left */}
                  <div className="flex gap-2 items-center">
                    {/* img */}
                    <div className="w-20 h-20 shadow bg-gray-200 rounded-md text-center flex justify-center items-center flex-shrink-0">
                      {cart.images.length !== 0 ? (
                        <img
                          src={cart.images[0].url}
                          className="w-full h-full rounded-md object-contain "
                          alt={cart.title}
                        />
                      ) : (
                        <span className="text-gray-500 text-sm">No Image</span>
                      )}
                    </div>
                    {/* text */}
                    <div className="ml-2 sm:ml-4">
                      <p className="font-bold break-words text-gray-700">
                        {cart.title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ${cart.price.toLocaleString()} x {cart.count}
                      </p>
                    </div>
                  </div>
                  {/*Row1 Right */}
                  <div className="font-bold text-blue-500 px-2">
                    ${(cart.price * cart.count).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right */}
          <div className=" bg-white px-6 py-4 rounded shadow-md max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 ">
              <h1 className="text-2xl font-bold text-gray-800 ">Total</h1>
              <Link to={"/shop"}>
                <button className="text-sm font-bold shadow bg-red-700 text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out">
                  <Reply size={16} />
                </button>
              </Link>
            </div>

            <div className="flex justify-between mb-2 text-gray-500">
              <span>Items</span>
              <span>{carts.length}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-500">
              <span>User</span>
              <span>{user ? user.email : "Guest"}</span>
            </div>
            {/* Checkout Button */}
            {user ? (
              carts.length > 0 ? (
                <button
                  onClick={handleSaveCart}
                  className="text-xl font-bold shadow w-full mt-4 bg-green-800 text-white px-4 py-3 rounded-md hover:cursor-pointer hover:bg-green-700 transition-all duration-300 ease-in-out"
                >
                  {`Checkout : $${getTotalPrice().toLocaleString()}`}
                </button>
              ) : (
                <button className="text-sm font-bold shadow w-full mt-4 bg-gray-500 text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out">
                  No Items to Checkout
                </button>
              )
            ) : (
              <Link to={"/login"}>
                <button className="text-sm font-bold shadow w-full mt-4 bg-blue-700 text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-blue-500 transition-all duration-300 ease-in-out">
                  Login to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListCart;
