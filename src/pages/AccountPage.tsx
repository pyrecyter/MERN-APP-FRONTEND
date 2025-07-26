import { useUser } from "../hooks";
import { Typography } from "@mui/material";

const AccountPage = () => {
  const { user } = useUser();

  return (
    <>
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
    </>
  );
};

export default AccountPage;
