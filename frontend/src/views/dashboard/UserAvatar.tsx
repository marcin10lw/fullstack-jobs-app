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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip';
import { useToast } from 'src/components/ui/use-toast';
import { authAPI } from 'src/api/auth/authApiAdapter';
import { User } from 'src/api/user/types';
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
          <AvatarImage src={user.avatar} alt="profile picture" className="object-cover" />
          <AvatarFallback className="text-sm">{getUserInitials(user)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[1000] w-52">
        <div className="flex flex-col gap-1 p-2">
          <p className="truncate">Hello {user.name}!</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="w-fit max-w-full truncate text-sm text-muted-foreground">{user.email}</p>
              </TooltipTrigger>
              <TooltipContent align="end" className="bg-secondary">
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link to={ROUTES.profile} className="w-full px-2 py-1.5">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.role === 'admin' && (
          <>
            <DropdownMenuItem className="p-0">
              <Link to={ROUTES.admin} className="w-full px-2 py-1.5">
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
            {isLoggingOut ? <Loader2 className="size-4 animate-spin" /> : 'Logout'}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
