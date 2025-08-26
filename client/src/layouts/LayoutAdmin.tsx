import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <div>
        <h1>sidebar</h1>
        <h1>header</h1>
        <hr />
        <Outlet />
    </div>
  )
}