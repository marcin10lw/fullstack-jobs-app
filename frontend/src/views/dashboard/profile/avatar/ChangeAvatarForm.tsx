import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactCropperElement } from 'react-cropper';

import { CURRENT_USER_QUERY_KEY } from 'src/api/user/constants';
import { userAPI } from 'src/api/user/userApiAdapter';
import { Button } from 'src/components/ui/button';
import { useToast } from 'src/components/ui/use-toast';
import { dataUrlToFile } from 'src/lib/helpers/dataUrlToFile';

interface ChangeAvatarFormProps {
  cropperRef: React.RefObject<ReactCropperElement>;
  buttonDisabled: boolean;
  selectedImage: File | null;
  onSuccessCleanup: () => void;
}

const ChangeAvatarForm = ({ cropperRef, buttonDisabled, selectedImage, onSuccessCleanup }: ChangeAvatarFormProps) => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { mutate: changeUserAvatarMutation, isLoading: isUpdatingUserAvatar } = useMutation({
    mutationFn: userAPI.changeUserAvatar,
    onSuccess: () => {
      qc.invalidateQueries([CURRENT_USER_QUERY_KEY]);
      toast({
        title: 'Avatar updated successfully',
        variant: 'success',
      });
      onSuccessCleanup();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: 'Could not update user',
          variant: 'destructive',
        });
      }
    },
  });

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cropper = cropperRef.current?.cropper;

    if (buttonDisabled || !cropper || !selectedImage) return;

    let quality = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (quality <= 0) break;
      const canvasDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg', quality);
      const file = await dataUrlToFile(canvasDataURL, selectedImage.name, 'image/jpeg');

      if (file.size <= selectedImage.size) {
        const formData = new FormData();
        formData.append('avatar', file);

        changeUserAvatarMutation(formData);
        break;
      }

      quality -= 0.01;
    }
  };

  return (
    <form onSubmit={onFormSubmit} noValidate encType="multipart/form-data">
      <Button
        className="mt-2 w-[115px] self-end"
        type="submit"
        disabled={buttonDisabled}
        isLoading={isUpdatingUserAvatar}
      >
        Save changes
      </Button>
    </form>
  );
};

export default ChangeAvatarForm;
