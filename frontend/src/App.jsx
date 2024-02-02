import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export default function App() {
  const [auth, setAuth] = useState();
  return (
    <div className="p-2 bg-beige h-min-screen dark:bg-slate-800 pb-20">
      <ThemeContextProvider>
        <NavBar auth={auth} setAuth={setAuth} />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
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
      </ThemeContextProvider>
    </div>
  );
}
