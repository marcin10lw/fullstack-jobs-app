import { useRouteError, ErrorResponse } from 'react-router-dom';

import notFountImage from 'src/assets/images/not-found.svg';
import { Link } from 'react-router-dom';

const Error = () => {
  const error = useRouteError() as ErrorResponse;

  if (error.status === 404) {
    return (
      <main className="mx-auto flex min-h-screen w-[--fluid-width] items-center justify-center text-center">
        <div>
          <img
            src={notFountImage}
            alt="not found"
            className="m-[-3rem_0_2rem] w-full max-w-[600px]"
          />
          <h3 className="mb-2">Page not found</h3>
          <p className="mb-2 leading-6 text-[--text-secondary-color]">
            we can't seem to find the page you are looking for
          </p>
          <Link to="/dashboard" className="capitalize text-[--primary-500]">
            back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-[--fluid-width] items-center justify-center text-center">
      <div>
        <h3>Something went wrong</h3>
      </div>
    </main>
  );
};
export default Error;
