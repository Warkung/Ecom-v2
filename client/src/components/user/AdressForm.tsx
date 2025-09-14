import { useEffect } from "react";
import { getUserData, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecomStore";

export default function AdressForm({
  address,
  setAddress,
}: {
  address: string;
  setAddress: (address: string) => void;
}) {
  const { token } = useEcomStore((state) => state);

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

  useEffect(() => {
    getAddressData();
  }, []);

  return (
    <div className=" p-4 rounded-md shadow-gray-500 border shadow">
      <h1 className="text-xl font-bold mb-4">Shipping Address</h1>
      <label htmlFor="address" className="block mb-2 text-sm font-medium ">
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
  );
}
