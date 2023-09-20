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
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            officia alias assumenda molestiae. Laudantium impedit mollitia
            animi, laboriosam ducimus distinctio ullam aliquam, molestiae
            necessitatibus repellat porro obcaecati fuga eligendi libero, eum
            quas numquam veritatis facere quidem ipsa similique? Id in dicta
            maxime recusandae commodi. Ea omnis veritatis consequatur eligendi
            ipsum.
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
