import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="p-2 bg-beige">
      <NavBar />
      <Outlet />
      <h1 className="font-commi text-4xl text-green">Faiza</h1>
      <h1 className="font-commi font-bold text-4xl text-dkGreen">
        Jean-François
      </h1>
      <h1 className="font-lexend text-4xl text-dkGreen">Toto</h1>
      <h1 className="font-lexend font-bold text-4xl text-sand">Pierre</h1>
    </div>
  );
}
