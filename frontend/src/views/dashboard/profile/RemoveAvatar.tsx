import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from 'src/components/ui/button';
import { CURRENT_USER_QUERY_KEY } from 'src/infrasctucture/user/constants';
import { userAPI } from 'src/infrasctucture/user/userApiAdapter';

const RemoveAvatar = () => {
  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: userAPI.removeUserAvatar,
    onSuccess: () => {
      qc.invalidateQueries([CURRENT_USER_QUERY_KEY]);
    },
  });

  const onAvatarDelete = () => mutate();

  return (
    <Button onClick={onAvatarDelete} disabled={isLoading} variant="link" className="text-white">
      {isLoading ? 'Removing...' : 'Remove photo'}
    </Button>
  );
};

export default RemoveAvatar;
