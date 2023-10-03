import { Link } from "react-router-dom";

import { Wrapper } from "src/assets/wrappers/LandingPage";
import { Logo } from "src/components";
import mainBackground from "src/assets/images/main.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            jobs <span>tracking</span> app
          </h1>
          <p>
            Discover the ease of managing your job applications with our app.
            Say goodbye to scattered notes and endless spreadsheets – simply add
            the jobs you've applied for, and let our app keep you organized
            throughout your job search journey.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>

          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>

        <img src={mainBackground} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
