/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

import closeButton from "../../assets/bouton-fermer.png";

export default function CreateTodo({ closeModal, setIsUpdated }) {
  const { auth } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, data, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsUpdated(true);
        });

      closeModal();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative shadow font-commi flex flex-col items-center gap-2 text-green text-2xl bg-sand p-6 rounded-md"
    >
      <label htmlFor="note">Votre note :</label>
      <input
        type="text"
        name="note"
        {...register("note", { required: "Vous devez remplir ce champs" })}
      />
      {errors.note && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.note?.message}
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
        onClick={() => closeModal()}
        className="absolute -top-4 -right-4 bg-black rounded-full border-4 border-black w-12"
      >
        <img src={closeButton} alt="croix rouge" />
      </button>
    </form>
  );
}

CreateTodo.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
