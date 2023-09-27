import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import customFetch from "src/utils/customFetch";
import { CustomAxiosError } from "src/types";
import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "src/components";
import { LoginFormData, loginFormData } from "src/models/Login";

const Login = () => {
  const [error, setError] = useState<CustomAxiosError | undefined>(undefined);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormData),
  });

  const mutation = useMutation({
    mutationFn: (formData: LoginFormData) => {
      return customFetch.post("/auth/login", formData);
    },
    onSuccess: () => {
      reset();
      navigate("/dashboard");
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 2000,
      });
    },
    onError: (error: CustomAxiosError) => {
      setError(error);
    },
  });

  const onFormSubmit = (formData: LoginFormData) => {
    mutation.mutate(formData);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onFormSubmit)} className="form" noValidate>
        <Logo />
        <h4>Login</h4>

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

        <button type="button" className="btn btn-block">
          explore the app
        </button>

        <p>
          Not a member yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>

        {mutation.isError && error && (
          <p className="status-msg error-msg">{error.response?.data.msg}</p>
        )}
      </form>
    </Wrapper>
  );
};
export default Login;
