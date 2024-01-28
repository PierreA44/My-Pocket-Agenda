import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [auth, setAuth] = useState();
  return (
    <div className="p-2 bg-beige h-screen">
      <NavBar />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Outlet context={{ auth, setAuth }} />
    </div>
  );
}
