
import Layout from '../components/Layout';
import { useUser } from '../hooks/useUser';
import { Typography } from '@mui/material';

const AccountPage = () => {
  const { user } = useUser();

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Page
      </Typography>
      {user ? (
        <>
          <Typography variant="h6">Name: {user.name}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Role: {user.role}</Typography>
        </>
      ) : (
        <Typography variant="h6">No user data available.</Typography>
      )}
    </Layout>
  );
};

export default AccountPage;
