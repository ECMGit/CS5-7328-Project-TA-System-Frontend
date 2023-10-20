import React from 'react';
import Box from '@mui/material/Box';

function BottomPanel() {
  return (
    <Box
      sx={{
        backgroundColor: '#757575',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
      }}
    >
      <img src="/logo_smu_blue.png" alt="SMU Logo" style={{ height: '10em' }} />
    </Box>
  );
}

export default BottomPanel;
