// MockResume.tsx

import React from 'react';
import { TAApplicationData } from '../pages/ViewApplications';  
import { Container,ApplicantTitle, ApplicantInfo } from '../pages/user/styledComponents';


type Props = {
    application: TAApplicationData;
}

const MockResume: React.FC<Props> = ({ application }) => {return (
  <Container>
    <ApplicantTitle>Applicant {application.studentId}</ApplicantTitle>
    <ApplicantInfo>Hours Can Work Per Week: {application.hoursCanWorkPerWeek}</ApplicantInfo>
    <ApplicantInfo>Courses Taken: {application.coursesTaken}</ApplicantInfo>
    <ApplicantInfo>GPA: {application.GPA}</ApplicantInfo>
    <ApplicantInfo>Required Courses: {application.requiredCourses}</ApplicantInfo>
    <ApplicantInfo>Required Skills: {application.requiredSkills}</ApplicantInfo>
    <ApplicantInfo>Resume File: {application.resumeFile}</ApplicantInfo>
    <ApplicantInfo>TA Job ID: {application.taJobId}</ApplicantInfo>



  </Container>
);
};

export default MockResume;
