import { useRouteError, ErrorResponse } from "react-router-dom";

import { Wrapper } from "src/assets/wrappers/ErrorPage";
import notFountImage from "src/assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError() as ErrorResponse;

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFountImage} alt="not found" />
          <h3>Page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
