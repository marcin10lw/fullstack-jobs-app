import { Link } from 'react-router-dom';

import mainBackground from 'src/assets/images/main.svg';
import Logo from 'src/components/Logo';
import { buttonVariants } from 'src/components/ui/button';
import { ROUTES } from 'src/routes';

const Landing = () => {
  return (
    <section>
      <nav className="h-20 px-10">
        <div className="mx-auto flex h-full max-w-screen-xl items-center">
          <Logo />
        </div>
      </nav>
      <article className="px-12">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-screen-xl items-center lg:grid-cols-[1fr,_400px] lg:gap-[0_3rem]">
          <div>
            <h1 className="mb-6 text-3xl font-bold md:text-5xl">
              jobs <span className="text-primary">tracking</span> app
            </h1>
            <p className="text-foreground mb-6 max-w-[35rem] text-lg leading-loose">
              Discover the ease of managing your job applications with our app.
              Say goodbye to scattered notes and endless spreadsheets – simply
              add the jobs you've applied for, and let our app keep you
              organized throughout your job search journey.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to={ROUTES.register}
                className={buttonVariants({ className: 'tracking-wider' })}
              >
                Register
              </Link>

              <Link
                to={ROUTES.login}
                className={buttonVariants({
                  className: 'tracking-wider',
                })}
              >
                Login / Demo User
              </Link>
            </div>
          </div>

          <img
            src={mainBackground}
            alt="job hunt"
            className="img hidden lg:block"
          />
        </div>
      </article>
    </section>
  );
};

export default Landing;
