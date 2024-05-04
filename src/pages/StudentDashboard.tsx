// StudentDashboard.tsx
import React from 'react';
import Container from '@mui/material/Container';
import TAJobDisplayComponent from './TAJobDisplayComponent';

const StudentDashboard: React.FC = () => {
    return (
        <Container maxWidth={false} style={{ marginTop: '20px' }}>
            <TAJobDisplayComponent />
        </Container>
    );
};

export default StudentDashboard;
