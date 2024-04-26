import { FieldError } from 'react-hook-form';

import userIcon from 'src/assets/images/user.svg';
import { buttonVariants } from 'src/components/ui/button';
import { useUser } from '../DashboardLayout';
import RemoveAvatar from './RemoveAvatar';

interface ProfilePictureProps {
  value: File | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  error?: FieldError;
}

const ProfilePicture = ({ value, onChange, error }: ProfilePictureProps) => {
  const { user } = useUser();

  return (
    <div className="relative h-[200px] w-[200px]">
      <div className="group relative block h-full w-full overflow-hidden rounded-full">
        <img
          src={
            value && value.type.includes('image/') ? URL.createObjectURL(value) : user.avatar ? user.avatar : userIcon
          }
          alt="user avatar"
          className="block h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-10 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50" />

        <div className="absolute inset-0 z-10 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <label
            htmlFor="avatar"
            className={buttonVariants({
              className: 'z-10 inline-block cursor-pointer text-white',
              variant: 'link',
            })}
          >
            Upload photo
          </label>
          {user.avatar && <RemoveAvatar />}
        </div>

        <input
          onChange={({ target }) => {
            if (target.files) {
              onChange(target.files[0]);
            }
          }}
          type="file"
          id="avatar"
          className="hidden"
          accept="image/*"
        />
      </div>

      {error && <p className="absolute top-[calc(100%_+_10px)] w-full text-center text-destructive">{error.message}</p>}
    </div>
  );
};

export default ProfilePicture;
