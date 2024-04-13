import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { useToast } from 'src/components/ui/use-toast';
import { authAPI } from 'src/infrasctucture/auth/authApiAdapter';
import { User } from 'src/infrasctucture/user/types';
import { getUserInitials } from 'src/lib/helpers/getUserInitials';
import { ROUTES } from 'src/routes';

type LogoutContainerProps = {
  user: User;
};

const UserAvatar = ({ user }: LogoutContainerProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: logoutUser, isLoading: isLoggingOut } = useMutation({
    mutationFn: authAPI.logoutUser,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Could not logout',
        description: 'Please try again',
        variant: 'destructive',
      });
    },
  });

  return (
    <DropdownMenu>
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

      <DropdownMenuContent align="end" className="w-50 z-[1000]">
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
        {user.role === 'admin' && (
          <>
            <DropdownMenuItem>
              <Link to={ROUTES.admin} className="w-full">
                Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer p-0">
          <button
            className="w-full px-2 py-1.5 text-start"
            onClick={(event) => {
              event.stopPropagation();
              logoutUser();
            }}
          >
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

export default UserAvatar;
