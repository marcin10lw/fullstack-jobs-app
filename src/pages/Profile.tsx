import { useUser } from "./DashboardLayout";

const Profile = () => {
  const { user } = useUser();

  return <h1>Profile</h1>;
};
export default Profile;
