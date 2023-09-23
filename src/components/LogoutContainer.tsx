import { useState } from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

import useDashboardContext from "src/hooks/useDashboardContext";
import useOutsideClick from "src/hooks/useOutsideClick";
import { Wrapper } from "src/assets/wrappers/LogoutContainer";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowLogout(false));

  return (
    <Wrapper ref={ref}>
      <button
        onClick={() => setShowLogout((showLogout) => !showLogout)}
        type="button"
        className="btn logout-btn"
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>

      {showLogout && (
        <div className="dropdown">
          <button onClick={logoutUser} type="button" className="dropdown-btn">
            logout
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default LogoutContainer;
