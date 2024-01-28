import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="p-2 bg-beige h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}
