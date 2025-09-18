import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaReceipt,
  FaTruck,
  FaChevronDown,
  FaTimesCircle,
} from "react-icons/fa";
import { getOrder } from "../../api/user";
import useEcomStore from "../../store/ecomStore";
import type { OrderType } from "../../interface/user";

// Define interfaces for the order data

export default function HistoryCard() {
  const { token } = useEcomStore((state) => state);
  const navigate = useNavigate();

  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>(
    {}
  );
  const [orders, setOrders] = useState<OrderType>([]);

  const fetchGetOrder = async () => {
    try {
      if (token) {
        const res = await getOrder(token);
        if (res && res.data) {
          setOrders(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetOrder();
  }, [token]);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (orders.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
        <FaBoxOpen className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">
          You haven't placed any orders. When you do, they'll show up here.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaReceipt className="mr-3 text-gray-400" />
                Order #{order.id.toString().slice(-6)}
              </h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-2xl font-bold text-blue-600 mb-2">
                ฿{order.amount.toLocaleString()}
              </p>
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                  order.orderStatus === "Completed"
                    ? "bg-green-200 text-green-700"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-200 text-red-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {order.orderStatus === "Completed" ? (
                  <FaCheckCircle className="mr-1.5" />
                ) : order.orderStatus === "Cancelled" ? (
                  <FaTimesCircle className="mr-1.5" />
                ) : (
                  <FaTruck className="mr-1.5" />
                )}
                {order.orderStatus}
              </span>
            </div>
          </div>

          <div
            className="flex justify-between items-center cursor-pointer mt-4"
            onClick={() => toggleOrderDetails(order.id)}
          >
            <h3 className="font-semibold text-gray-700">
              {expandedOrders[order.id] ? "Hide" : "Show"} Items Ordered
            </h3>
            <button
              className={`transform text-gray-500 transition-transform duration-300 hover:text-gray-800 ${
                expandedOrders[order.id] ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown />
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
              expandedOrders[order.id]
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-3 pt-4">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.count}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ฿{item.product.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-700">
                      ฿{(item.product.price * item.count).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
