import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, ListItem, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// User interface type
interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  smuNo?: string;
  year: string;
  avatarUrl: string;
  role: string;
}

// AvatarWrapperProps interface type
interface AvatarWrapperProps {
  user: User;
  onLogout: () => void;
  onProfile: () => void;
}

/* AvatarWrapper Component */
const AvatarWrapper: React.FC<AvatarWrapperProps> = ({ user, onLogout, onProfile }) => {
  // State Field(s)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Non-State Variable(s)
  const open = Boolean(anchorEl);


  const navigate = useNavigate();

  /**
   * Handle clicking the avatar, show the menu onClick
   * @param event captured mouse click event
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };

  /**
   * Handle mouse exit event, close the menu.
   */
  const handleClose = () => { setAnchorEl(null); };

  /* JSX */
  return (
    <>
      <Avatar
        alt="User Avatar"
        src={user.avatarUrl}
        style={{ cursor: 'pointer' }}
        onMouseOver={handleClick}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        autoFocus={false}
        MenuListProps={{
          onMouseLeave: handleClose,
          sx: { paddingLeft: '10px', width: '250px' }
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 0, // Move 'elevation' inside 'sx'
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ListItem sx={{ py: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'grey' }}>Welcome {user.firstName}!</Typography>
        </ListItem>
        <Divider />
        <MenuItem onClick={onProfile}>
          <Typography variant="body1">User Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          navigate('/feedback');
        }}>
          <Typography variant="body1">Feedback</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          navigate('/bug-report');
        }}>
          <Typography variant="body1">Report Bug</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export default AvatarWrapper;
