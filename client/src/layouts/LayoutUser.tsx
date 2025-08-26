import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div>
      <h1>Home User</h1>
      <hr />
      <Outlet />
    </div>
  );
}
