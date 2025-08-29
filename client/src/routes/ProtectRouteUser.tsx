import { useEffect, useState } from "react";
import useEcomStore from "../store/ecomStore";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";
import type { ReactElement } from "react";

interface ProtectRouteAdminProps {
  element: ReactElement;
}

export default function ProtectRouteUser({ element }: ProtectRouteAdminProps) {
  const [auth, setAuth] = useState(false);
  const { user, token } = useEcomStore((state) => state);

  useEffect(() => {
    if (user && token)
      // send to back
      currentUser(token)
        .then(() => setAuth(true))
        .catch(() => setAuth(false));
  }, []);

  return auth ? element : <LoadingToRedirect />;
}
