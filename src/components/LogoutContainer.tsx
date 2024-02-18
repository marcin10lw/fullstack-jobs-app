import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { User } from 'src/types';
import customFetch from 'src/helpers/customFetch';
import useOutsideClick from 'src/hooks/useOutsideClick';

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
      await customFetch.get('/auth/logout');
      navigate('/');
      toast.success('Logout successfully', { position: 'top-center' });
      setIsLoading(false);
    } catch (error) {
      toast.error('Could not logout');
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowLogout((showLogout) => !showLogout)}
        type="button"
        className="btn flex max-w-[140px] items-center justify-start gap-2 px-2 py-1"
      >
        <div className="h-[25px] w-[25px] flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="user avatar"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <span className="block overflow-x-clip text-ellipsis">{user.name}</span>
        <div className="h-4 w-4 flex-shrink-0">
          <FaCaretDown />
        </div>
      </button>

      {showLogout && (
        <div className="absolute left-1/2 top-[calc(100%_+_20px)] w-full -translate-x-1/2 rounded-[--border-radius] bg-[--primary-500]">
          <button
            onClick={logoutUser}
            disabled={isLoading}
            type="button"
            className="w-full cursor-pointer rounded-[--border-radius] p-2 capitalize tracking-[--letter-spacing] text-[--white]"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutContainer;
