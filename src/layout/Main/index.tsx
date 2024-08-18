import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainView() {
  return (
    <div
      className="h-screen v-screen flex flex-row
      after:contents-[''] after:absolute after:top-0
      after:z-[-1] after:w-screen after:h-screen after:bg-mainPattern
      after:bg-background
      after:bg-blend-difference after:bg-[length:500px]
      after:opacity-[0.1] dark:after:opacity-[0.05] after:bg-repeat after:invert"
    >
      <NavBar />

      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
}
