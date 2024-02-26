/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plus } from 'lucide-react';
import { useUser } from '../DashboardLayout';
import { FieldError } from 'react-hook-form';
import userIcon from 'src/assets/images/user.svg';

interface ProfilePictureProps {
  value: File | null;
  onChange: (...event: any[]) => void;
  error?: FieldError;
}

const ProfilePicture = ({ value, onChange, error }: ProfilePictureProps) => {
  const { user } = useUser();

  return (
    <div className="relative h-[200px] w-[200px]">
      <label
        htmlFor="avatar"
        className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-full"
      >
        <img
          src={
            value && value.type.includes('image/')
              ? URL.createObjectURL(value)
              : user.avatar
              ? user.avatar
              : userIcon
          }
          alt="user avatar"
          className="block h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-10 grid place-items-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40">
          <Plus className="size-12" />
        </div>
      </label>

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
      {error && (
        <p className="absolute top-[calc(100%_+_10px)] w-full text-center text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ProfilePicture;
