import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-2 mt-8 p-2 text-dkGreen dark:text-sand">
      <h1 className="font-lexend text-3xl ">Bienvenue sur</h1>
      <h1 className="font-lexend text-4xl mb-4">My Pocket Agenda,</h1>
      <p className="font-commi font-bold text-xl">
        votre gestionnaire d'agenda personnel !
      </p>
      <div className="font-commi font-bold text-xl flex flex-col gap-2 items-center mt-12">
        <NavLink
          to="/registration"
          className="font-bold text-2xl hover:underline hover:underline-offset-4"
        >
          Inscrivez-vous
        </NavLink>
        <p>ou</p>
        <NavLink
          to="/login"
          className="font bold text-2xl hover:underline hover:underline-offset-4"
        >
          connectez-vous
        </NavLink>
      </div>
    </section>
  );
}
