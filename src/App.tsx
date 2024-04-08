import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
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

import ViewFacultyTasks from './pages/task/TaskDisplayComponentFaculty';
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

import FeedbackPage from './pages/feedback/Feedback';
import BugReportPage from './pages/bug-report/bug-report';
import ViewStudents from './pages/Admin/ViewStudents';
import ViewFaculties from './pages/Admin/ViewFaculties';
import ViewCourses from './pages/Admin/ViewCourses';
import CreateMessage from './pages/user/CreateMessage';

// TODO: Merge following page with above viewAllCourses page, we only need one page for viewing courses
import ViewAllCourses from './pages/courses/ViewAllCourses';
import AddCourse from './pages/courses/AddCourse';
import ViewCourse from './pages/courses/ViewCourse';
import EditCourse from './pages/courses/EditCourse';

import CreateTask from './pages/task/CreateTask';
import ViewCurrentTasks from './pages/task/TasksDisplayComponent';
import ViewAssignedTasks from './pages/task/TaskDisplayComponentFaculty';

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

const PrivateRoute = ({ role, userId, children }: PrivateRouteProps) => {
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
};
//make an if statement to check if the user is a student or faculty and then render the correct page for jobs
function PrivateRouteJob() {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }
  if (userContext.user.role === 'admin') {
    return <ViewJobs />;
  } else if (userContext.user.role === 'student') {
    return <ViewJobsStudent />;
  } else if (userContext.user.role === 'faculty') {
    return <ViewJobs />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

type PrivateRoutePerformanceReviewProps = {
  children: React.ReactNode;
};

//Only faculty and student himself have access to the performanceReview page
function PrivateRoutePerformanceReview({
  children,
}: PrivateRoutePerformanceReviewProps) {
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>(); // get parameters from routes

  // If there is no uer, jump to login
  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  // faculty have all the access to the page
  if (userContext.user.role === 'faculty') {
    return <>{children}</>;
  }

  // student only have the access to the page when it's his performance
  if (
    userContext.user.role === 'student' &&
    userContext.user.id.toString() === id
  ) {
    return <>{children}</>;
  }

  // if none of the condition is fulfilled, to unauthoried
  return <Navigate to="/unauthorized" />;
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
          {/* Profile module */}

          <Route
            path="/student-profile"
            element={
              <PrivateRoute role="student">
                {' '}
                <StudentProfile />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty-profile"
            element={
              <PrivateRoute role="faculty">
                {' '}
                <FacultyProfile />{' '}
              </PrivateRoute>
            }
          />

          {/* Job Module */}

          <Route path="/create-task" element={<CreateTask />} />
          <Route
            path="/tasks/student"
            element={
              <PrivateRoute role="student">
                <ViewCurrentTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/faculty"
            element={
              <PrivateRoute role="faculty">
                <ViewAssignedTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/student-profile"
            element={
              <PrivateRoute role="student">
                <StudentProfile />
              </PrivateRoute>
            }
          />

          <Route path="/inbox" element={<Inbox />} />

          <Route index element={<Navigate to="/home" />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route
            path="/view-courses"
            element={
              <PrivateRoute role="admin">
                <ViewAllCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-course/:id"
            element={
              <PrivateRoute role="admin">
                <ViewCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <PrivateRoute role="admin">
                <AddCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-course/:id"
            element={
              <PrivateRoute role="admin">
                <EditCourse />
              </PrivateRoute>
            }
          />

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

          {/* Application Module */}
          <Route path="/application-form" element={<ApplicationPage />} />

          <Route
            path="/view-applications"
            element={
              <PrivateRoute role="faculty">
                {' '}
                <ViewApplications />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/view-application/:id"
            element={
              <PrivateRoute role="faculty">
                {' '}
                <ViewApplication />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-application/:id"
            element={
              <PrivateRoute role="student">
                {' '}
                <EditApplication />{' '}
              </PrivateRoute>
            }
          />

          {/* Student Performance Review Module */}
          <Route
            path="/evaluate-performance"
            element={
              <PrivateRoute role="faculty">
                {' '}
                <EvaluatePerformance />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/performance-result/:studentId"
            element={
              <PrivateRoutePerformanceReview>
                {' '}
                <PerformanceResult />{' '}
              </PrivateRoutePerformanceReview>
            }
          />
          <Route path="/user-data" element={<UserDataPage />} />

          {/* FeedBack and Bug Report Module */}
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/bug-report" element={<BugReportPage />} />

          {/* admin resources */}
          <Route
            path="/students"
            element={
              <PrivateRoute role="admin">
                {' '}
                <ViewStudents />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/faculties"
            element={
              <PrivateRoute role="admin">
                {' '}
                <ViewFaculties />{' '}
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute role="admin">
                {' '}
                <ViewCourses />{' '}
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
