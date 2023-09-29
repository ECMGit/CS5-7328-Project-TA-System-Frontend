import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SxProps } from '@mui/system';

interface CopyrightProps extends TypographyProps {
  sx?: SxProps;
}

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
