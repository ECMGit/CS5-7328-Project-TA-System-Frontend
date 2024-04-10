import { Box, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../provider';

export const StudentFeatureRequestPage = () => {
  const user = useContext(UserContext);
  const [content, setContent] = useState('');

  // Function to submit feedback
  const submit = async (content: string) => {
    // Explicitly type the parameter
    const response = await fetch('http://localhost:9000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        userId: user?.user?.id,
      }),
    });

    const data = await response.json();
    console.log(data);
    setContent(''); // Clear the textarea
  };

  return (
    <Box>
      <Typography variant="h6">Feedback page</Typography>
    </Box>
  );
};
