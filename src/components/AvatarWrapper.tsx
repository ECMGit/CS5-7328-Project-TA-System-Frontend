import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, ListItem, Divider } from '@mui/material';

interface User {
  firstName: string;
  username: string;
  avatarUrl: string;
  role: string;
  smuNo?: number;
}

interface AvatarWrapperProps {
  user: User;
  onLogout: () => void;
}

const AvatarWrapper: React.FC<AvatarWrapperProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };

  return (
    <>
      <Avatar
        alt="User Avatar"
        src={user.avatarUrl}
        style={{ marginRight: '10px', cursor: 'pointer' }}
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ListItem sx={{ py: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'grey' }}>Welcome {user.firstName}!</Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          <Typography variant="subtitle1" sx={{ color: 'grey' }}>User type: {user.role}</Typography>
        </ListItem>
        {user.smuNo && (
          <ListItem sx={{ py: 0.5 }}>
            <Typography variant="body1" sx={{ color: 'grey' }}>SMU ID: {user.smuNo}</Typography>
          </ListItem>
        )}
        <Divider />
        <MenuItem onClick={onLogout}>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export default AvatarWrapper;