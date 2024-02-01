/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import closeButton from "../../assets/bouton-fermer.png";

export default function EditContact({ closeModal, setIsUpdated, editID }) {
  const { auth } = useOutletContext();
  const [currentContact, setCurrentContact] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/contact/${editID}`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((res) => setCurrentContact(res.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = (data) => {
    try {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/contact/${editID}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        )
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
      <h1 className="font-bold">Modifier le contact</h1>
      <label htmlFor="name">Nom du contact :</label>
      <input
        type="text"
        name="name"
        placeholder={currentContact?.name}
        className="rounded-md pl-2"
        {...register("name", { required: "Vous devez remplir ce champs" })}
      />
      {errors.name && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.name?.message}
        </p>
      )}
      <label htmlFor="email">Email :</label>
      <input
        type="email"
        name="email"
        className="rounded-md pl-2"
        placeholder={currentContact?.email}
        {...register("email", { required: "Vous devez remplir ce champs" })}
      />
      {errors.email && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.email?.message}
        </p>
      )}
      <label htmlFor="phone">Numéro de téléphone :</label>
      <input
        type="text"
        name="phone"
        className="rounded-md pl-2"
        placeholder={currentContact?.phone_number}
        {...register("phone_number")}
      />
      {errors.phone_number && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.phone_number?.message}
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

EditContact.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  editID: PropTypes.number.isRequired,
};
