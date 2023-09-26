import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "src/utils/customFetch";
import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "src/components";
import { RegisterFormData, registerFormData } from "src/models/Register";

type CustomAxiosError = AxiosError<{ msg?: string }>;

const Register = () => {
  const [error, setError] = useState<CustomAxiosError | undefined>(undefined);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormData),
  });

  const mutation = useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 1500)
      );

      return customFetch.post("/auth/register", formData);
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
        reset();
      }, 5000);
    },
    onError: (error: CustomAxiosError) => {
      setError(error);
    },
  });

  const onFormSubmit = (formData: RegisterFormData) => {
    mutation.mutate(formData);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onFormSubmit)} className="form" noValidate>
        <Logo />
        <h4>Register</h4>

        <FormRow
          error={errors.name}
          register={register("name")}
          labelText="name"
          name="name"
          type="text"
        />
        <FormRow
          error={errors.lastName}
          register={register("lastName")}
          labelText="last name"
          name="lastName"
          type="text"
        />
        <FormRow
          error={errors.location}
          register={register("location")}
          labelText="location"
          name="location"
          type="text"
        />
        <FormRow
          error={errors.email}
          register={register("email")}
          labelText="email"
          name="email"
          type="email"
        />
        <FormRow
          error={errors.password}
          register={register("password")}
          labelText="password"
          name="password"
          type="password"
        />

        <button
          disabled={mutation.isLoading}
          type="submit"
          className="btn btn-block"
        >
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>

        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>

        {mutation.isSuccess && (
          <p className="status-msg success-msg">
            User Created! <span>You will be redirected to login page</span>
          </p>
        )}

        {mutation.isError && error && (
          <p className="status-msg error-msg">{error.response?.data.msg}</p>
        )}
      </form>
    </Wrapper>
  );
};
export default Register;
