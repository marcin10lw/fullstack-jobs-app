import { Link } from "react-router-dom";

import { Wrapper } from "src/assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "src/components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow labelText="name" name="name" type="text" defaultValue="john" />
        <FormRow
          labelText="last name"
          name="lastName"
          type="text"
          defaultValue="doe"
        />
        <FormRow
          labelText="location"
          name="location"
          type="text"
          defaultValue="poland"
        />
        <FormRow
          labelText="email"
          name="email"
          type="email"
          defaultValue="john_doe@gmail.com"
        />
        <FormRow
          labelText="password"
          name="password"
          type="password"
          defaultValue="secret123"
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
