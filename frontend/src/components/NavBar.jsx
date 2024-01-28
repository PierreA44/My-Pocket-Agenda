import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const auth = {};
  const navLinks = [
    {
      id: 1,
      path: "/login",
      title: "Se connecter",
    },
    {
      id: 2,
      path: "/registration",
      title: "S'inscrire",
    },
  ];

  const navLinksAuth = [
    {
      id: 1,
      path: "/agenda",
      title: "Mon agenda",
    },
    {
      id: 2,
      path: "/contact",
      title: "Mes contacts",
    },
    {
      id: 3,
      path: "/todolist",
      title: "Mes notes",
    },
  ];

  return (
    <nav className="flex flex-row gap-2 items-center">
      <button
        type="button"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <img src={logo} alt="logo" width="150rem" />
      </button>
      <div className="flex flex-col justify-around items-start">
        {isVisible && !auth
          ? navLinks.map((n) => (
              <button
                type="button"
                key={n.id}
                onClick={() => {
                  navigate(`${n.path}`);
                  setIsVisible(false);
                }}
              >
                {n.title}
              </button>
            ))
          : null}

        {isVisible && auth
          ? navLinksAuth.map((n) => (
              <button
                type="button"
                key={n.id}
                onClick={() => {
                  navigate(`${n.path}`);
                  setIsVisible(false);
                }}
              >
                {n.title}
              </button>
            ))
          : null}
      </div>
    </nav>
  );
}
