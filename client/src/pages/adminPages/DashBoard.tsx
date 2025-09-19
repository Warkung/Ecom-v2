import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock Data
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
];

const recentOrders = [
  {
    id: "#1234",
    customer: "John Doe",
    date: "2023-10-27",
    total: "$150.00",
    status: "Completed",
  },
  {
    id: "#1235",
    customer: "Jane Smith",
    date: "2023-10-27",
    total: "$200.50",
    status: "Processing",
  },
  {
    id: "#1236",
    customer: "Peter Jones",
    date: "2023-10-26",
    total: "$75.25",
    status: "Dispatched",
  },
  {
    id: "#1237",
    customer: "Mary Johnson",
    date: "2023-10-26",
    total: "$300.00",
    status: "Completed",
  },
  {
    id: "#1238",
    customer: "Chris Lee",
    date: "2023-10-25",
    total: "$50.00",
    status: "Cancelled",
  },
];

const topProducts = [
  { name: "Wireless Headphones", sold: 120 },
  { name: "Smart Watch", sold: 95 },
  { name: "Bluetooth Speaker", sold: 80 },
  { name: "Laptop Stand", sold: 75 },
  { name: "USB-C Hub", sold: 60 },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  changeType: "increase" | "decrease";
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
        <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
    <div className="mt-4 flex space-x-1 items-center text-sm">
      <span
        className={`${
          changeType === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </span>
      <span className="text-gray-500 dark:text-gray-400">from last month</span>
    </div>
  </div>
);

function DashBoard() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          change="+20.1%"
          changeType="increase"
        />
        <StatCard
          title="Total Sales"
          value="+12,234"
          icon={ShoppingCart}
          change="+18.1%"
          changeType="increase"
        />
        <StatCard
          title="New Customers"
          value="+235"
          icon={Users}
          change="+5.4%"
          changeType="increase"
        />
        <StatCard
          title="Orders to Fulfill"
          value="32"
          icon={Package}
          change="-2.0%"
          changeType="decrease"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200 dark:stroke-gray-700"
              />
              <XAxis
                dataKey="name"
                className="text-xs text-gray-500 dark:text-gray-400"
              />
              <YAxis className="text-xs text-gray-500 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)", // bg-gray-800 with opacity
                  borderColor: "rgb(75, 85, 99)", // border-gray-600
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4f46e5"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Selling Products
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200 dark:stroke-gray-700"
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 12 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "rgb(75, 85, 99)",
                  color: "#fff",
                }}
              />
              <Bar dataKey="sold" fill="#4f46e5" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : order.status === "Dispatched"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
