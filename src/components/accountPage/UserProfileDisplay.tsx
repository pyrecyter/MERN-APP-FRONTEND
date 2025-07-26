import { Typography, Box } from "@mui/material";
import type { User } from "../../types";

interface UserProfileDisplayProps {
  user: User;
}

const UserProfileDisplay = ({ user }: UserProfileDisplayProps) => {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        User Profile
      </Typography>
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body1">
          <b>Name:</b> {user.name}
        </Typography>
      </Box>
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body1">
          <b>Email:</b> {user.email}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">
          <b>Role:</b> {user.role}
        </Typography>
      </Box>
    </>
  );
};

export default UserProfileDisplay;