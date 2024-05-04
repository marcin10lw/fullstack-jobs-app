import userIcon from 'src/assets/images/user.svg';
import { useUser } from '../DashboardLayout';
import AvatarCropper from './avatar/AvatarCropper';
import RemoveAvatar from './RemoveAvatar';

const ProfilePicture = () => {
  const { user } = useUser();

  return (
    <div className="relative h-[200px] w-[200px]">
      <div className="group relative block h-full w-full overflow-hidden rounded-full">
        <img
          src={user.avatar ? user.avatar : userIcon}
          alt="user avatar"
          className="block h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-10 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50" />

        <div className="absolute inset-0 z-10 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AvatarCropper />
          {user.avatar && <RemoveAvatar />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
