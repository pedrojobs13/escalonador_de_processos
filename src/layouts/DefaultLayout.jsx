import { Outlet } from "react-router-dom";
import { Default } from "../components/Default";
import { TimeContext } from "../contexts/TimeContext";
import { useContext } from "react";
import { DefaultToFairShare } from "../components/DefaultToFairShare";
export function DefaultLayout() {
  const { isFairShareTrue } = useContext(TimeContext)
  if (isFairShareTrue) {
    return (
      <div>
        <DefaultToFairShare />
        <Outlet />
      </div>
    );
  }
  return (
    <div>
      <Default />
      <Outlet />
    </div>
  );

}
