import { useEffect, useState } from "react";
import { getUserCart } from "../../api/user";
import useEcomStore from "../../store/ecomStore";
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

export default function SummaryCard({ address }: { address: string }) {
  const { token } = useEcomStore((state) => state);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();

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

  const handlePayment = () => {
    navigate("/user/payment");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className=" p-4 rounded-md border shadow-gray-500 shadow space-y-4 ">
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
                  ฿ {(product.product.price * product.count).toLocaleString()}
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
  );
}
