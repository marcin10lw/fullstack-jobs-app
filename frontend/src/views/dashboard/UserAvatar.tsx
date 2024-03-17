import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { User } from 'src/infrasctucture/user/types';
import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { getUserInitials } from 'src/lib/helpers/getUserInitials';
import { ROUTES } from 'src/routes';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { useToast } from 'src/components/ui/use-toast';

type LogoutContainerProps = {
  user: User;
};

const UserAvatar = ({ user }: LogoutContainerProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: logoutUser, isLoading: isLoggingOut } = useMutation({
    mutationFn: userAPI.logoutUser,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast({
        title: 'Successfully logout',
        variant: 'success',
      });
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
        <DropdownMenuItem className="cursor-pointer">
          <button
            className="w-full text-start"
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
