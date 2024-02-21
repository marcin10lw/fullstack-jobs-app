import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from 'src/helpers/customFetch';
import { getUserInitials } from 'src/helpers/getUserInitials';
import { User } from 'src/infrasctucture/user/types';
import { ROUTES } from 'src/routes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Loader2 } from 'lucide-react';

type LogoutContainerProps = {
  user: User;
};

const LogoutContainer = ({ user }: LogoutContainerProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    setIsLoggingOut(true);

    try {
      await new Promise((_, reject) => setTimeout(reject, 4000));
      await customFetch.get('/auth/logout');
      navigate('/');
      toast.success('Logout successfully', { position: 'top-center' });
    } catch (error) {
      toast.error('Could not logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu
      open={showDropdown}
      onOpenChange={() => {
        setShowDropdown((prev) => !prev);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage
            src={user.avatar}
            alt="profile picture"
            className="object-cover"
          />
          <AvatarFallback className="text-sm">
            {getUserInitials(user)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[1000] w-40">
        <div className="flex flex-col gap-1 p-2">
          <p className="truncate">Hello {user.name}!</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={ROUTES.profile} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <button className="w-full text-start" onClick={logoutUser}>
            {isLoggingOut ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Logout'
            )}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutContainer;
