import { useEffect, useState, useCallback } from "react";
import useEcomStore from "../../store/ecomStore";
import {
  changeUserRole,
  changeUserStatus,
  listAllUsers,
} from "../../api/admin";
import { toast } from "react-toastify";

export type UserType = UserType2[];

export interface UserType2 {
  id: number;
  email: string;
  role: string;
  enabled: boolean;
  address: string;
  createdAt: string;
}

export default function UsersTable() {
  const { token } = useEcomStore((state) => state);
  const [users, setUsers] = useState<UserType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (token) {
        const res = await listAllUsers(token);
        if (res && res.data) {
          setUsers(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleChangeStatus = async (id: number, enabled: boolean) => {
    try {
      if (token) {
        const payload = { id, enabled };
        await changeUserStatus(token, payload);
        toast.success(
          `User status updated to ${
            enabled ? "Active" : "Inactive"
          } successfully`
        );
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleChangeRole = async (id: number, role: "admin" | "user") => {
    try {
      if (token) {
        const payload = { id, role };
        await changeUserRole(token, payload);
        toast.success(`User role updated to ${role} successfully`);
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (isLoading) {
    return <div className="mt-10 text-center">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="mt-10 text-center">No users found.</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="bg-gray-100 min-w-full divide-y divide-gray-300 dark:divide-gray-700 shadow-xl">
          <thead className="bg-gray-400 dark:bg-gray-800">
            <tr className="text-gray-900 dark:text-gray-300">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-300">
                  #{user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleChangeRole(
                        user.id,
                        e.target.value as "admin" | "user"
                      )
                    }
                    className="block w-full pl-3 pr-10 py-2 text-base bg-gray-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => handleChangeStatus(user.id, !user.enabled)}
                    className="focus:outline-none"
                  >
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.enabled
                          ? "bg-green-300 text-green-900 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-300 text-red-900 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {user.enabled ? "Active" : "Inactive"}
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                  {user.address || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
