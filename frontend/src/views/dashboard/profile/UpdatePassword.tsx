import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import ContentWrapper from 'src/components/ContentWrapper';
import LabeledRegisterInput from 'src/components/LabeledRegisterInput';
import { Button } from 'src/components/ui/button';
import { UpdatePasswordSchema, updatePasswordSchema } from 'src/models/User';

const UpdatePassword = () => {
  const {
    register: registerChangePassword,
    formState: { errors: changePasswordErrors },
    handleSubmit: handleSubmitNewPassword,
  } = useForm<UpdatePasswordSchema>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const onChangePasswordSubmit = () => {};

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
