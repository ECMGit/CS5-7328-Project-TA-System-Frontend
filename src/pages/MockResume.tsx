// MockResume.tsx

// Import React, which is required for creating React components.
import React from 'react';
// Import the TAApplicationData type from the 'ViewApplications' module.
import { TAApplicationData } from './application/ViewApplications';
// Import several styled components from the 'styledComponents' module.  
import { Container,ApplicantTitle, ApplicantInfo } from '../pages/user/styledComponents';
// Used for buttons
import { Button } from '@mui/material';
import useAutoLogout from '../components/AutoLogOut';

const { Modal, closeModal } = useAutoLogout();

// Define the 'Props' type, specifying that it should contain an 'application' property of type 'TAApplicationData'.
type Props = {
    application: TAApplicationData;
}

// Define a React functional component called 'MockResume' that takes 'Props' as its props.
const MockResume: React.FC<Props> = ({ application }) => {return (
  // Render the component and return JSX.
  <Container>
    <ApplicantTitle>Applicant {application.studentId}</ApplicantTitle>
    <ApplicantInfo>Hours Can Work Per Week: {application.hoursCanWorkPerWeek}</ApplicantInfo>
    <ApplicantInfo>Courses Taken: {application.coursesTaken}</ApplicantInfo>
    <ApplicantInfo>GPA: {application.GPA}</ApplicantInfo>
    <ApplicantInfo>Required Courses: {application.requiredCourses}</ApplicantInfo>
    <ApplicantInfo>Required Skills: {application.requiredSkills}</ApplicantInfo>
    <ApplicantInfo>Resume File: {application.resumeFile}</ApplicantInfo>
    <ApplicantInfo>TA Job ID: {application.taJobId}</ApplicantInfo>
    <Button
      variant="contained"
      color="primary"
      onClick={() => (window.location.href = '/edit-application/' + application.id)}
    >
      {' '}
      Edit Application{' '}
    </Button>
    {Modal}
  </Container>
);
};

// Export the 'MockResume' component so it can be used in other parts of the application.
export default MockResume;
