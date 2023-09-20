import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "src/components";
import { RegisterFormData, registerFormData } from "src/models/Register";

const defaultValues = {
  name: "john",
  lastName: "doe",
  location: "usa",
  email: "john_doe@gamil.com",
  password: "secret123",
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues,
    resolver: zodResolver(registerFormData),
  });

  const onFormSubmit = (formData: RegisterFormData) => {};

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

        <button type="submit" className="btn btn-block">
          Submit
        </button>

        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
