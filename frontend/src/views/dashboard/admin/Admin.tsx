import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../DashboardLayout';
import GeneralStats from './GeneralStats';
import UsersTable from './UsersTable';

const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user?.role !== 'admin') navigate(-1);
  }, [user, navigate]);

  return (
    <section className="flex flex-col gap-8">
      <GeneralStats />
      <UsersTable />
    </section>
  );
};
export default Admin;
