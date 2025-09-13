import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500 text-xl  ">Access denied.</p>
        <p className="text-gray-500 text-xl  "> Redirecting to login page in</p>
        <p className="text-gray-500 text-2xl font-semibold">
          {count} second{count !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}
export default LoadingToRedirect;
