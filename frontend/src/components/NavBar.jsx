import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.png";
import sun from "../assets/soleil.png";
import moon from "../assets/lunes.png";
import logout from "../assets/deconnexion.png";

export default function NavBar({ auth, setAuth }) {
  const { theme, handleThemeChange } = useTheme();
  const navigate = useNavigate();
  const navLinks = [
    {
      id: 1,
      path: "/login",
      title: "Se connecter",
      style: "-mx-1",
    },
    {
      id: 2,
      path: "/registration",
      title: "S'inscrire",
      style: "-mx-1",
    },
  ];

  const navLinksAuth = [
    {
      id: 1,
      path: "/agenda",
      title: "Mon agenda",
      style: "-mx-4",
    },
    {
      id: 2,
      path: "/contact",
      title: "Mon répertoire",
      style: "-mx-1",
    },
    {
      id: 3,
      path: "/todolist",
      title: "Mes notes",
      style: "-mx-1",
    },
    {
      id: 4,
      path: "/user",
      title: "Mes infos",
      style: "-mx-4",
    },
  ];

  const logOut = () => {
    setAuth("");
    navigate("/");
  };

  return (
    <nav className="flex flex-row items-center font-commi font-bold text-dkGreen dark:text-sand text-xl">
      <button
        type="button"
        onClick={() => navigate("/agenda")}
        className="w-28 m-6"
      >
        <img src={logo} alt="logo" />
      </button>
      <div className="flex flex-col justify-center items-start">
        {!auth
          ? navLinks.map((n) => (
              <button
                type="button"
                key={n.id}
                className={n.style}
                onClick={() => navigate(`${n.path}`)}
              >
                {n.title}
              </button>
            ))
          : null}

        {auth ? (
          <>
            {navLinksAuth.map((n) => (
              <button
                type="button"
                key={n.id}
                className={n.style}
                onClick={() => navigate(`${n.path}`)}
              >
                {n.title}
              </button>
            ))}
            <button
              type="button"
              onClick={logOut}
              className="absolute top-3 dark:shadow left-2 dark:rounded-lg dark:bg-sand p-1 dark:border-2 dark:border-black w-[35px] dark:w-[36px]"
            >
              <img src={logout} alt="déconnexion" />
            </button>
          </>
        ) : null}
      </div>
      <button
        type="button"
        className="fixed top-3 right-3"
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <img src={sun} alt="soleil" width="40" />
        ) : (
          <img src={moon} alt="lune" width="40" />
        )}
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  auth: PropTypes.string.isRequired,
  setAuth: PropTypes.func.isRequired,
};
