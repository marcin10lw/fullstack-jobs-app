import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from 'src/components/ui/button';
import { CURRENT_USER_QUERY_KEY } from 'src/api/user/constants';
import { userAPI } from 'src/api/user/userApiAdapter';

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
    <Button onClick={onAvatarDelete} disabled={isLoading} variant="link" className="text-white" type="button">
      {isLoading ? 'Removing...' : 'Remove photo'}
    </Button>
  );
};

export default RemoveAvatar;
