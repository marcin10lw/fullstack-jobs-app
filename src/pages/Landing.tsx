import { Link } from 'react-router-dom';

import { Logo } from 'src/components';
import mainBackground from 'src/assets/images/main.svg';

const Landing = () => {
  return (
    <section>
      <nav className="mx-auto flex h-[--nav-height] w-[--fluid-width] max-w-[--max-width] items-center">
        <Logo />
      </nav>
      <div className="container -mt-12 grid min-h-[calc(100vh_-_var(--nav-height))] items-center lg:grid-cols-[1fr,_400px] lg:gap-[0_3rem]">
        <div>
          <h1 className="mb-6 font-bold">
            jobs <span className="text-[var(--primary-500)]">tracking</span> app
          </h1>
          <p className="mb-6 max-w-[35rem] leading-loose text-[--text-secondary-color]">
            Discover the ease of managing your job applications with our app.
            Say goodbye to scattered notes and endless spreadsheets – simply add
            the jobs you've applied for, and let our app keep you organized
            throughout your job search journey.
          </p>

          <Link to="/register" className="btn mr-4 px-4 py-3">
            Register
          </Link>

          <Link to="/login" className="btn px-4 py-3">
            Login / Demo User
          </Link>
        </div>

        <img
          src={mainBackground}
          alt="job hunt"
          className="img hidden lg:block"
        />
      </div>
    </section>
  );
};

export default Landing;
