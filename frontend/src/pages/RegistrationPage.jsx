/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      axios.post("url", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 mt-8">
      <h1>Veuillez remplir ces champs pour vous inscrire</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        <input type="text" name="pseudo" {...register("pseudo")} />
        {errors.pseudo && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.pseudo?.message}
          </p>
        )}
        <input type="email" name="email" {...register("email")} />
        {errors.email && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.email?.message}
          </p>
        )}
        <input
          type="email"
          name="confirm-email"
          {...register("confirmEmail")}
        />
        {errors.confirmEmail && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.confirmEmail?.message}
          </p>
        )}
        <input type="password" name="password" {...register("password")} />
        {errors.password && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.password?.message}
          </p>
        )}
        <input
          type="password"
          name="confirm-password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.confirmPassword?.message}
          </p>
        )}
        <input type="text" />
        <button type="submit">Créer mon compte</button>
      </form>
    </section>
  );
}
