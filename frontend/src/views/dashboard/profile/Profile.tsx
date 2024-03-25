import ChangePassword from './ChangePassword';
import UpdateUser from './UpdateUser';

const Profile = () => {
  return (
    <div className="flex flex-col gap-8">
      <UpdateUser />
      <ChangePassword />
    </div>
  );
};
export default Profile;
