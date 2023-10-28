import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordResetRequestPage from './pages/login/PasswordResetRequest';
import PasswordResetPage from './pages/login/PasswordReset';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUpPage';
import Home from './pages/Home';
import './stylesheets/App.css';
import FacultyProfile from './pages/user/FacultyProfile';
import StudentProfile from './pages/user/StudentProfile';
import JobInfo from './pages/JobInfo';


import ApplicationPage from './pages/application/ApplicationPage';
import PostJob from './pages/faculty-jobs/PostJobPage';
import ViewJobs from './pages/faculty-jobs/ViewJobsPage';
import UserDataPage from './pages/user/UserDataPage';
import ViewApplications from './pages/application/ViewApplications';
import MockResume from './pages/MockResume';
import { TAApplicationData } from './pages/application/ViewApplications';
// import { fakeAuthProvider } from "./auth";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<PasswordResetRequestPage />} />
        <Route path="/password-reset/:token" element={<PasswordResetPage />} />
        
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/jobs/details/:id" element={<JobInfo/>}/>
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<ViewJobs />} />
        <Route path="/faculty-profile" element={<FacultyProfile />} />
        <Route path="/application-form" element={<ApplicationPage />} />
        <Route path="/view-applications" element={<ViewApplications />} />
        <Route path="/user-data" element={<UserDataPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default App;
