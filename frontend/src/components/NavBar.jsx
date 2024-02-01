import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";

export default function NavBar({ auth, setAuth }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    {
      id: 1,
      path: "/login",
      title: "Se connecter",
      style: "-mx-4",
    },
    {
      id: 2,
      path: "/registration",
      title: "S'inscrire",
      style: "-mx-4",
    },
  ];

  const navLinksAuth = [
    {
      id: 1,
      path: "/agenda",
      title: "Mon agenda",
      style: "-mx-7",
    },
    {
      id: 2,
      path: "/contact",
      title: "Mon répertoire",
      style: "-mx-4",
    },
    {
      id: 3,
      path: "/todolist",
      title: "Mes notes",
      style: "-mx-4",
    },
  ];

  const logOut = () => {
    setAuth("");
    navigate("/");
    setIsVisible(false);
  };

  return (
    <nav className="flex flex-row items-center font-commi font-bold text-dkGreen text-xl">
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="w-28 m-6"
      >
        <img src={logo} alt="logo" />
      </button>
      <div className="flex flex-col justify-center items-start">
        {isVisible && !auth
          ? navLinks.map((n) => (
              <button
                type="button"
                key={n.id}
                className={n.style}
                onClick={() => {
                  navigate(`${n.path}`);
                  setIsVisible(false);
                }}
              >
                {n.title}
              </button>
            ))
          : null}

        {isVisible && auth ? (
          <>
            {navLinksAuth.map((n) => (
              <button
                type="button"
                key={n.id}
                className={n.style}
                onClick={() => {
                  navigate(`${n.path}`);
                  setIsVisible(false);
                }}
              >
                {n.title}
              </button>
            ))}
            <button type="button" onClick={logOut} className="-mx-7">
              Se déconnecter
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  auth: PropTypes.string.isRequired,
  setAuth: PropTypes.func.isRequired,
};
