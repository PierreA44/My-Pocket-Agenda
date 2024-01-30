/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";
import closeButton from "../../assets/bouton-fermer.png";

export default function CreateRDV({ closeModal, setIsUpdated }) {
  const { auth } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      className="relative shadow font-commi flex flex-col items-center gap-2 text-green text-2xl bg-sand p-6 rounded-md"
    >
      <h1>Nouveau RDV</h1>
      <label htmlFor="title">Titre :</label>
      <input
        type="text"
        name="title"
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
        {...register("shedulled_date", {
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
        <input type="number" name="start" className="w-8" {...register("")} />
        <p>heure</p>
        <input type="number" name="start" className="w-8" />
        <p>minutes</p>
      </div>
      <label htmlFor="end">Heure de fin :</label>
      <div className="flex flex-row gap-1">
        <input type="number" name="end" className="w-8" />
        <p>heure</p>
        <input type="number" name="end" className="w-8" />
        <p>minutes</p>
      </div>
      <label htmlFor="description">Détails :</label>
      <textarea name="description" id="" cols="20" rows="2" />
      <label htmlFor="contact">Ajouter un de vos contacts ?</label>
      <select name="contact">
        <option value="">--</option>
      </select>
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

CreateRDV.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
