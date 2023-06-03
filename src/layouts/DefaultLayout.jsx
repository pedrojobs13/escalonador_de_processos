import { Outlet } from "react-router-dom";
import { Default } from "../components/Default";

export function DefaultLayout() {
  return (
    <div>
      <Default />
      <Outlet />
    </div>
  );
}
