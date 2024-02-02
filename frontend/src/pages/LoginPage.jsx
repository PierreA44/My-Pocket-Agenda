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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        data
      );
      if (response.status === 200) {
        toast.info(response.data.message);
        setAuth(response.data.token);
        navigate("/agenda");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 mt-8 bg-beige h-screen">
      <h1 className="text-dkGreen text-3xl text-center font-lexend">
        Connexion
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow font-commi flex flex-col items-center gap-2 text-green text-2xl bg-sand p-6 rounded-md bg-opacity-80"
      >
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          className="rounded-md pl-2"
          {...register("email", { required: "Veuillez renseigner votre mail" })}
        />
        {errors.email && (
          <p
            role="alert"
            className="bg-red-600 text-beige text-sm px-1 py-0.5 rounded-md"
          >
            {errors.email?.message}
          </p>
        )}
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          className="rounded-md pl-2"
          {...register("password", {
            required: "Veuillez renseigner votre mot-de-passe",
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
        <button
          type="submit"
          className="bg-green text-sand font-bold active:bg-dkGreen shadow px-2 py-1 mt-4 rounded-md"
        >
          Se connecter
        </button>
      </form>
    </section>
  );
}
