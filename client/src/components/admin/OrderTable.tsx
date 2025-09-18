import { useEffect, useState, useCallback } from "react";
import { changeOrderStatus, getOrder } from "../../api/admin";
import useEcomStore from "../../store/ecomStore";
import { toast } from "react-toastify";
import type { OrderAdminType } from "../../interface/admin";

const orderStatusOptions = [
  "Not Process",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Completed",
];

export default function OrderTable() {
  const { token } = useEcomStore((state) => state);
  const [orders, setOrders] = useState<OrderAdminType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGetOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      if (token) {
        const res = await getOrder(token);
        if (res && res.data) {
          setOrders(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleStatusChange = async (orderId: number, orderStatus: string) => {
    try {
      if (token) {
        const payload = { orderId, orderStatus };
        await changeOrderStatus(token, payload);
        toast.success("Order status updated successfully");
        fetchGetOrders(); // Refetch orders to show the update
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status.");
    }
  };

  useEffect(() => {
    fetchGetOrders();
  }, []);

  if (isLoading) {
    return <div className="mt-10 text-center">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="mt-10 text-center">No orders found.</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="bg-gray-100 min-w-full divide-y divide-gray-300 dark:divide-gray-700 shadow-xl">
          <thead className="bg-gray-300 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider"
              >
                Payment Status
              </th>
              <th
                scope="col"
                className="hidden px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider md:table-cell"
              >
                Ordered By
              </th>
              <th
                scope="col"
                className="hidden px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider lg:table-cell"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider"
              >
                Order Status
              </th>
              <th
                scope="col"
                className="hidden px-6 py-3 text-center text-xs font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wider md:table-cell"
              >
                Ordered Date
              </th>
            </tr>
          </thead>
          <tbody className=" dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-700">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-300">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "succeeded"
                        ? "bg-green-300 text-green-900 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-300 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300 md:table-cell">
                  {order.orderedBy?.name || order.orderedBy?.email}
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-800 dark:text-gray-300 lg:table-cell">
                  <ul className="list-disc list-inside">
                    {order.products.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span
                          className="max-w-72 truncate"
                          title={item.product.title}
                        >
                          {item.product.title}
                        </span>
                        <span className="ml-1">x {item.count}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800 dark:text-gray-300">
                  {order.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: order.currency.toUpperCase(),
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    {orderStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300 text-center md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
