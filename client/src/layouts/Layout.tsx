import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Main Nav</h1>
      <hr />
      <Outlet />
    </div>
  );
}
