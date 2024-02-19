import { useRouteError, ErrorResponse } from 'react-router-dom';

import notFountImage from 'src/assets/images/not-found.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/routes';

const Error = () => {
  const error = useRouteError() as ErrorResponse;

  if (error.status === 404) {
    return (
      <main className="mx-auto flex min-h-screen items-center justify-center p-5 text-center">
        <div>
          <img
            src={notFountImage}
            alt="not found"
            className="m-[-3rem_0_2rem] w-full max-w-[600px]"
          />
          <h3 className="mb-2 text-4xl">Page not found</h3>
          <p className="mb-2 text-xl leading-6">
            we can't seem to find the page you are looking for
          </p>
          <Link
            to={ROUTES.dashboard}
            className="text-lg capitalize text-primary"
          >
            back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen items-center justify-center p-5 text-center">
      <div>
        <h3 className="text-4xl">Something went wrong</h3>
      </div>
    </main>
  );
};
export default Error;
