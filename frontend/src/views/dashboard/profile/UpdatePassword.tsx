import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import ContentWrapper from 'src/components/ContentWrapper';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { ChangePasswordSchema, changePasswordSchema } from 'src/schema/User';
import { useMutation } from '@tanstack/react-query';
import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { useToast } from 'src/components/ui/use-toast';
import errorMessage from 'src/lib/helpers/errorMessage';
import { CustomAxiosError } from 'src/types';

const UpdatePassword = () => {
  const {
    register: registerChangePassword,
    formState: { errors: changePasswordErrors },
    handleSubmit: handleSubmitNewPassword,
    reset: resetChangePasswordForm,
  } = useForm<ChangePasswordSchema>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const { toast } = useToast();

  const { mutate: changePassword } = useMutation({
    mutationFn: userAPI.changePassword,
    onSuccess: () => {
      toast({
        title: 'Password changed successfully',
        variant: 'success',
      });
      resetChangePasswordForm();
    },
    onError: (error: CustomAxiosError) => {
      console.log(error);
      toast({
        title: errorMessage(error, 'Could not change password'),
        variant: 'destructive',
      });
    },
  });

  const onChangePasswordSubmit = (formData: ChangePasswordSchema) => {
    changePassword(formData);
  };

  return (
    <ContentWrapper title="Change password">
      <form
        onSubmit={handleSubmitNewPassword(onChangePasswordSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-4 md:max-w-[300px]">
          <LabeledRegisterInput
            register={registerChangePassword('currentPassword')}
            error={changePasswordErrors.currentPassword}
            withPasswordToggle
            label="current password"
            name="currentPassword"
            type="password"
          />
          <LabeledRegisterInput
            register={registerChangePassword('newPassword')}
            error={changePasswordErrors.newPassword}
            withPasswordToggle
            label="new password"
            name="newPassword"
            type="password"
          />
          <Button className="mt-3">Change Password</Button>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default UpdatePassword;
