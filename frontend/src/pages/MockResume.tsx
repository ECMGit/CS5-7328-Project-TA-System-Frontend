// MockResume.tsx

import React from 'react';
import { TAApplicationData } from '../pages/ViewApplications';  // adjust the path

type Props = {
    application: TAApplicationData;
}

const MockResume: React.FC<Props> = ({ application }) => {return (
  <div>
    <h2>Applicant {application.studentId}</h2>
    <p>Hours Can Work Per Week: {application.hoursCanWorkPerWeek}</p>
    <p>Courses Taken: {application.coursesTaken}</p>
    <p>GPA: {application.GPA}</p>
    <p>Required Courses: {application.requiredCourses}</p>
    <p>Required Skills: {application.requiredSkills}</p>
    <p>Resume File: {application.resumeFile}</p>
    <p>TA Job ID: {application.taJobId}</p>



  </div>
);
};

export default MockResume;
