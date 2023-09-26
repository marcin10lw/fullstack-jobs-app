import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "src/utils/customFetch";
import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "src/components";
import { RegisterFormData, registerFormData } from "src/models/Register";
import { useState } from "react";

const defaultValues = {
  name: "",
  lastName: "",
  location: "",
  email: "",
  password: "",
};

const Register = () => {
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues,
    resolver: zodResolver(registerFormData),
  });

  const mutation = useMutation({
    mutationFn: (formData: RegisterFormData) => {
      return customFetch.post("/auth/register", formData);
    },
    onSuccess: () => reset(),
    onError: (error: AxiosError<{ msg: string | undefined }>) => {
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
          Submit
        </button>

        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>

        {mutation.isSuccess && (
          <p className="status-msg success-msg">User Created!</p>
        )}

        {mutation.isError && error && (
          <p className="status-msg error-msg">
            {error.response?.status === 400 && "invalid credentials"}
            {error.response?.status === 404 && "could not register"}
          </p>
        )}
      </form>
    </Wrapper>
  );
};
export default Register;
