import { useUser } from "./DashboardLayout";

const Profile = () => {
  const { user } = useUser();

  console.log(user);

  return <h1>Profile</h1>;
};
export default Profile;
