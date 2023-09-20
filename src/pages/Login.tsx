import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "src/components";
import { LoginFormData, loginFormData } from "src/models/Login";

const defaultValues = {
  email: "john_doe@gamil.com",
  password: "secret123",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues,
    resolver: zodResolver(loginFormData),
  });

  const onFormSubmit = (formData: LoginFormData) => {};

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

        <button type="submit" className="btn btn-block">
          Submit
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
      </form>
    </Wrapper>
  );
};
export default Login;
