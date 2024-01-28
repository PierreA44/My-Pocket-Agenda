/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useOutletContext();

  const onSubmit = async (data) => {
    try {
      await axios
        .post("url", data)
        .then((res) => setAuth(res.data))
        .catch((res) => toast.error(res.data));
      navigate("/agenda");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2 mt-12"
    >
      <h1>Connexion</h1>
      <label htmlFor="email">Email :</label>
      <input
        type="email"
        name="email"
        {...register("email", { required: "Veuillez renseigner votre mail" })}
      />
      {errors.email && (
        <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
          {errors.email?.message}
        </p>
      )}
      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password"
        name="password"
        {...register("password", {
          required: "Veuillez renseigner votre mot-de-passe",
        })}
      />
      {errors.password && (
        <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
          {errors.password?.message}
        </p>
      )}
      <button type="submit">Se connecter</button>
    </form>
  );
}
