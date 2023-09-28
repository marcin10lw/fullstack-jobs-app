import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import { User } from "src/types";
import customFetch from "src/utils/customFetch";
import useOutsideClick from "src/hooks/useOutsideClick";
import { Wrapper } from "src/assets/wrappers/LogoutContainer";

type LogoutContainerProps = {
  user: User;
};

const LogoutContainer = ({ user }: LogoutContainerProps) => {
  const [showLogout, setShowLogout] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowLogout(false));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    setIsLoading(true);

    try {
      await customFetch.get("/auth/logout");
      navigate("/");
      toast.success("Logout successfully", { position: "top-center" });
      setIsLoading(false);
    } catch (error) {
      toast.error("Could not logout");
      setIsLoading(false);
    }
  };

  return (
    <Wrapper ref={ref}>
      <button
        onClick={() => setShowLogout((showLogout) => !showLogout)}
        type="button"
        className="btn logout-btn"
      >
        {user.avatar ? (
          <img src={user.avatar} alt="user avatar" className="image" />
        ) : (
          <FaUserCircle />
        )}
        {user.name}
        <FaCaretDown />
      </button>

      {showLogout && (
        <div className="dropdown">
          <button
            onClick={logoutUser}
            disabled={isLoading}
            type="button"
            className="dropdown-btn"
          >
            logout
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default LogoutContainer;
