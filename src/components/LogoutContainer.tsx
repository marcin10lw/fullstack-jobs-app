import { useState } from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

import { User } from "src/types";
import useOutsideClick from "src/hooks/useOutsideClick";
import { Wrapper } from "src/assets/wrappers/LogoutContainer";

type LogoutContainerProps = {
  user: User;
};

const LogoutContainer = ({ user }: LogoutContainerProps) => {
  const [showLogout, setShowLogout] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowLogout(false));

  return (
    <Wrapper ref={ref}>
      <button
        onClick={() => setShowLogout((showLogout) => !showLogout)}
        type="button"
        className="btn logout-btn"
      >
        <FaUserCircle />
        {user.name}
        <FaCaretDown />
      </button>

      {showLogout && (
        <div className="dropdown">
          <button type="button" className="dropdown-btn">
            logout
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default LogoutContainer;
