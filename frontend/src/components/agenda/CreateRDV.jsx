/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import closeButton from "../../assets/bouton-fermer.png";

export default function CreateRDV({ closeModal, setIsUpdated }) {
  const { auth } = useOutletContext();
  const [userContacts, setUserContacts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      .then((res) => setUserContacts(res.data));
    setIsUpdated(true);
  }, []);

  const onSubmit = (data) => {
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/rdv`, data, {
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
      className="relative shadow font-commi flex flex-col items-center gap-2 text-green text-xl bg-sand p-6 rounded-md"
    >
      <h1 className="text-2xl font-lexend">Nouveau RDV</h1>
      <label htmlFor="title">Titre :</label>
      <input
        type="text"
        name="title"
        className="rounded-md pl-4"
        {...register("title", { required: "Renseignez un titre !" })}
      />
      {errors.title && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.title?.message}
        </p>
      )}
      <label htmlFor="date">Date :</label>
      <input
        type="date"
        name="date"
        className="rounded-md pl-4"
        {...register("date", {
          required: "Ajoutez une date pour votre rdv",
        })}
      />
      {errors.title && (
        <p
          role="alert"
          className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
        >
          {errors.title?.message}
        </p>
      )}
      <label htmlFor="start">Heure de début :</label>
      <div className="flex flex-row gap-1">
        <input
          type="number"
          name="start"
          className="w-12 rounded-md pl-2"
          {...register("startH")}
        />
        <p>h</p>
        <input
          type="number"
          name="start"
          className="w-12 rounded-md pl-2 ml-4"
          {...register("startM")}
        />
        <p>min</p>
      </div>
      <label htmlFor="end">Heure de fin :</label>
      <div className="flex flex-row gap-1">
        <input
          type="number"
          name="end"
          className="w-12 rounded-md pl-2"
          {...register("endH")}
        />
        <p>h</p>
        <input
          type="number"
          name="end"
          className="w-12 rounded-md pl-2 ml-4"
          {...register("endM")}
        />
        <p>min</p>
      </div>
      <label htmlFor="description">Détails :</label>
      <textarea
        name="description"
        className="rounded-md pl-4"
        cols="20"
        rows="2"
        {...register("description")}
      />
      <label htmlFor="contact">Ajouter un de vos contacts ?</label>
      <select
        name="contact"
        className="rounded-md pl-4"
        {...register("contacts")}
      >
        <option value="">------</option>
        {userContacts.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => closeModal()}
        className="absolute -top-4 -right-4 bg-black rounded-full border-4 border-black w-12"
      >
        <img src={closeButton} alt="croix rouge" />
      </button>
      <button
        type="submit"
        className="bg-green text-sand font-bold active:bg-dkGreen shadow px-2 py-1 mt-4 rounded-md"
      >
        Valider
      </button>
    </form>
  );
}

CreateRDV.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
