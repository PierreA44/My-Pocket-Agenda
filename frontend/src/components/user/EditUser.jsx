/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import closeButton from "../../assets/bouton-fermer.png";

export default function EditUser({ closeModal, setIsUpdated }) {
  const { auth } = useOutletContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, data, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsUpdated(true);
        });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative shadow font-commi flex flex-col items-center gap-2 text-green text-2xl bg-sand p-6 rounded-md"
    >
      <label htmlFor="pseudo">Modifier votre pseudo :</label>
      <input
        type="text"
        name="pseudo"
        className="rounded-md bg-slate-200 pl-2"
        {...register("pseudo")}
      />
      <label htmlFor="email">Modifier votre email :</label>
      <input
        type="email"
        name="email"
        className="rounded-md bg-slate-200 pl-2"
        {...register("email", {
          pattern: {
            value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
            message: "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
          },
        })}
      />
      {errors.email && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.email?.message}
        </p>
      )}
      <label htmlFor="confirm-email">Confirmez l'email :</label>
      <input
        type="email"
        name="confirm-email"
        className="rounded-md bg-slate-200 pl-2"
        {...register("confirm_email", {
          validate: (value) =>
            value === watch("email") || "Emails non identiques",
        })}
      />
      {errors.confirmEmail && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.confirmEmail?.message}
        </p>
      )}
      <button
        type="submit"
        className="bg-green text-sand font-bold active:bg-dkGreen shadow px-2 py-1 mt-4 rounded-md"
      >
        Valider
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="absolute -top-4 -right-4 bg-black rounded-full border-4 border-black w-12"
      >
        <img src={closeButton} alt="croix rouge" />
      </button>
    </form>
  );
}

EditUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
