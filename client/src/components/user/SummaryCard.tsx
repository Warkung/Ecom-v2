import { useEffect, useState } from "react";
import { getUserCart, getUserData } from "../../api/user";
import useEcomStore from "../../store/ecomStore";
import { saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ProductItem = {
  product: {
    title: string;
    price: number;
    // add other fields if needed
  };
  count: number;
  // add other fields if needed
};

function SummaryCard() {
  const { token } = useEcomStore((state) => state);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const getAddressData = async () => {
    try {
      const user = token && (await getUserData(token));
      if (user && user.data) {
        setAddress(user.data.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = token && (await getUserCart(token));

      if (response && response.data) {
        setProducts(response.data.cart.products);
        setCartTotal(response.data.cart.cartTotal);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const handleSaveAddress = async () => {
    if (!address) {
      return toast.warn("Please enter a shipping address");
    }
    try {
      token && (await saveAddress(token, address));
      toast.success("Address saved successfully!");
    } catch (error) {
      console.log("Failed to save address:", error);
      toast.error("Failed to save address");
    }
  };

  const handlePayment = () => {
    navigate("/user/payment");
  };

  useEffect(() => {
    fetchCart();
    getAddressData();
  }, []);

  return (
    <div className="mx-auto w-full p-6 max-w-6xl  rounded-lg shadow-md">
      <div className="flex gap-4 justify-between ">
        {/* left */}
        <div className="w-5/12  ">
          <div className=" p-4 rounded-md shadow-gray-500 border shadow">
            <h1 className="text-xl font-bold mb-4">Shipping Address</h1>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium "
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              className="w-full h-24 border  rounded-md p-2 "
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            />
            <button
              onClick={handleSaveAddress}
              className=" font-semibold mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:shadow-md  transition-color duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* right */}
        <div className="w-7/12">
          <div className=" p-4 rounded-md border shadow-gray-500 shadow  space-y-4">
            <h1 className="text-xl font-bold mb-4">Order Summary</h1>
            <hr />

            {/* Items List */}

            {products.map((product, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between items-end mb-2 ">
                    <div>
                      <p className="font-bold">{product.product.title}</p>
                      <p>
                        {product.product.price} x {product.count}
                      </p>
                    </div>
                    <div className="text-right font-bold">
                      <p>
                        ฿{" "}
                        {(
                          product.product.price * product.count
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div>
              <div className="flex justify-between items-end ">
                <p>Shipping cost</p>
                <p>฿ 0.00</p>
              </div>

              <div className="flex justify-between items-end ">
                <p>Discount</p>
                <p>- ฿ 0.00</p>
              </div>
              <hr />
            </div>

            {/* Total */}
            <div>
              <div className="flex justify-between items-end ">
                <p className="font-bold text-2xl">Total</p>
                <p className=" font-bold text-2xl text-red-500">
                  ฿ {cartTotal.toLocaleString()}
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={!address}
                className={
                  address
                    ? "w-64 mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 hover:shadow-md transition-color duration-200"
                    : "w-64 mt-4 bg-gray-700 text-white px-4 py-2 rounded-md "
                }
              >
                {address ? "Payment" : "Please fill in the address."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SummaryCard;
