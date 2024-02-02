/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import closeButton from "../../assets/bouton-fermer.png";

export default function EditPassword({ closeModal, setIsUpdated }) {
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
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/mdp`, data, {
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
      <label htmlFor="password">Nouveau mot de passe :</label>
      <input
        type="password"
        name="password"
        className="rounded-md bg-slate-200 pl-2"
        {...register("password", {
          required: "Ce champs est obligatoire",
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:
              "Votre mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, one number et un caractère spécial",
          },
        })}
      />
      {errors.password && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.password?.message}
        </p>
      )}
      <label htmlFor="confirm-password">Confirmez le mot de passe :</label>
      <input
        type="password"
        name="confirm-password"
        className="rounded-md bg-slate-200 pl-2"
        {...register("confirmPassword", {
          required: "Vous devez confirmer votre mot de passe",
          validate: (value) =>
            value === watch("password") || "Mots de passe non identiques",
        })}
      />
      {errors.confirmPassword && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.confirmPassword?.message}
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

EditPassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
