import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import ViewJobsStudent from './pages/faculty-jobs/StudentApplyJobPage';
import EvaluatePerformance from './pages/faculty-jobs/JobPerformanceReviewPage';
import PerformanceResult from './pages/user/PerformanceResultPage';
import UserDataPage from './pages/user/UserDataPage';
import ViewApplications from './pages/application/ViewApplications';
import EditApplication from './pages/application/EditApplication';
import ViewApplication from './pages/application/ViewApplication';
import MockResume from './pages/MockResume';
import HomeDefault from './pages/HomeDefault';
import ProviderLayout, { UserContext } from './provider';
import axios from 'axios';
import Inbox from './pages/user/Inbox';

// adds jsonwebtoken if present to each api request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // console.log(token); // debugging purposes

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface PrivateRouteProps {
  role: string;
  userId?: number;
  children: React.ReactNode;
}

function PrivateRoute({ role, userId, children }: PrivateRouteProps) {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  if (
    userContext.user.role === role &&
    (!userId || userContext.user.id === userId)
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}
//make an if statement to check if the user is a student or faculty and then render the correct page for jobs
function PrivateRouteJob() {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  if (userContext.user.role === 'student') {
    return <ViewJobsStudent />;
  } else if (userContext.user.role === 'faculty') {
    return <ViewJobs />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home-default" element={<HomeDefault />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<PasswordResetRequestPage />} />
        <Route path="/password-reset/:token" element={<PasswordResetPage />} />

        <Route path="/" element={<ProviderLayout />}>
          {/* These routes are nested with user auth :D */}
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          {/* <Route
            path="/student-profile"
            element={
              <PrivateRoute role="student">
                <StudentProfile />
              </PrivateRoute>
            }
          /> */}

          <Route
            path="/student-profile"
            element={
              <StudentProfile />
            }
          />

          <Route path="/inbox" element={<Inbox />} />
          <Route path="/jobs/details/:id" element={<JobInfo />} />
          <Route
            path="/post-job"
            element={
              <PrivateRoute role="faculty">
                <PostJob />
              </PrivateRoute>
            }
          />
          <Route path="/jobs" element={<PrivateRouteJob />} />
          <Route
            path="/faculty-profile"
            element={
              <PrivateRoute role="faculty">
                <FacultyProfile />
              </PrivateRoute>
            }
          />
          <Route path="/application-form" element={<ApplicationPage />} />
          <Route
            path="/view-applications"
            element={
              <PrivateRoute role="faculty">
                <ViewApplications />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-application/:id"
            element={
              <PrivateRoute role="faculty">
                <ViewApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-application/:id"
            element={
              <PrivateRoute role="student">
                <EditApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/evaluate-performance"
            element={
              <PrivateRoute role="faculty">
                <EvaluatePerformance />
              </PrivateRoute>
            }
          />
          <Route
            path="/performance-result"
            element={
              <PrivateRoute role="faculty">
                <PerformanceResult />
              </PrivateRoute>
            }
          />
          <Route path="/user-data" element={<UserDataPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
