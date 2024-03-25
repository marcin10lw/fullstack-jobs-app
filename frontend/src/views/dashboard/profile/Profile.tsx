import UpdatePassword from './UpdatePassword';
import UpdateUser from './UpdateUser';

const Profile = () => {
  return (
    <div className="flex flex-col gap-8">
      <UpdateUser />
      <UpdatePassword />
    </div>
  );
};
export default Profile;
