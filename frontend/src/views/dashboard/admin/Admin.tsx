import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../DashboardLayout';
import AdminContent from './AdminContent';

const Admin = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user?.role !== 'admin') navigate(-1);
  }, [user, navigate]);

  return <AdminContent />;
};
export default Admin;
