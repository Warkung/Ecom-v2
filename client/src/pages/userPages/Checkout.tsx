import { useState } from "react";
import AdressForm from "../../components/user/AdressForm";
import SummaryCard from "../../components/user/SummaryCard";

export default function Checkout() {
  const [address, setAddress] = useState("");

  return (
    <main className=" min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <AdressForm address={address} setAddress={setAddress} />
          </div>
          <div className="lg:col-span-2">
            <SummaryCard address={address} />
          </div>
        </div>
      </div>
    </main>
  );
}
