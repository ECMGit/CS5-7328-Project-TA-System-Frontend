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
import AdminSignUpPage from './pages/login/AdminSignUpPage';
import SignUpPage from './pages/login/SignUpPage';
import Home from './pages/Home';
import './stylesheets/App.css';
import FacultyProfile from './pages/user/FacultyProfile';
import StudentProfile from './pages/user/StudentProfile';
import AdminProfile from './pages/user/AdminProfile';
import JobInfo from './pages/JobInfo';

import ViewFacultyTasks from './pages/task/TaskDisplayComponentFaculty';
import ViewApplicationsbyFacultyID from './pages/application/ViewApplications';
import ApplicationPage from './pages/application/ApplicationPage';
import PostJob from './pages/faculty-jobs/PostJobPage';
import ViewJobs from './pages/faculty-jobs/ViewJobsPage';
import ViewJobsStudent from './pages/faculty-jobs/StudentApplyJobPage';
import EvaluatePerformance from './pages/faculty-jobs/JobPerformanceReviewPage';
import PerformanceResult from './pages/user/PerformanceResultPage';
import UserDataPage from './pages/user/UserDataPage';
import UnauthorizedPage from'./pages/UnauthorizedPage' ;

import EditApplication from './pages/application/EditApplication';
import ViewApplication from './pages/application/ViewApplication';
import MockResume from './pages/MockResume';
import HomeDefault from './pages/HomeDefault';
import ProviderLayout, { UserContext } from './provider';
import axios from 'axios';
import Inbox from './pages/user/Inbox';

import ViewStudents from './pages/Admin/ViewStudents';
import ViewFaculties from './pages/Admin/ViewFaculties';
import ViewCourses from './pages/Admin/ViewCourses';
import CreateMessage from './pages/user/CreateMessage';

import CourseDetail from './pages/Admin/ViewCourseDetail';

// TODO: Merge following page with above viewAllCourses page, we only need one page for viewing courses
import ViewAllCourses from './pages/courses/ViewAllCourses';
import AddCourse from './pages/courses/AddCourse';
import ViewCourse from './pages/courses/ViewCourse';
import EditCourse from './pages/courses/EditCourse';
import TopNav from './components/TopNav';

import CreateTask from './pages/task/CreateTask';
import ViewCurrentTasks from './pages/task/TasksDisplayComponent';
import ViewAssignedTasks from './pages/task/TaskDisplayComponentFaculty';
import PostJobSuccessPage from './pages/faculty-jobs/PostJobSuccessPage';
import EditJobPage from './pages/faculty-jobs/EditJobPage';

import { StudentFeatureRequestPage } from './pages/feedback/StudentFeatureRequestpage';
import { MainLayout } from './components/MainLayout';
import { AdminFeedbackPage } from './pages/feedback/AdminFeedbackPage';
import { IndividualFeedbackPage } from './pages/feedback/IndividualFeedbackPage';
import AboutUs from './pages/AboutUs';
import Messages from './pages/user/Messages';

import ViewApplicationsByJobID from './pages/application/ViewApplicationsByJobID';

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
  role?: string;
  roles?: string[];
  userId?: number;
  children: React.ReactNode;

}

const PrivateRoute = ({ role, roles, userId, children }: PrivateRouteProps) => {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  const effectiveRoles = Array.from(
    new Set([...(roles || []), ...(role ? [role] : [])])
  );

  if (
    effectiveRoles.includes(userContext.user.role) &&
    (!userId || userContext.user.id === userId)
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

//Define PrivateRoutes to Allow it to handle multiple roles.
interface PrivateRouteProp {
  roles: string[];
  userId?: number;
  children: React.ReactNode;
}

const PrivateRoutes = ({ roles, userId, children }: PrivateRouteProp) => {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    return <Navigate to="/login" />;
  }

  if (roles.includes(userContext.user.role) && (!userId || userContext.user.id === userId)) {
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
  return <Navigate to="/unauthoried" />;
}


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home-default" element={<HomeDefault />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path={'/signup/admin'} element={<AdminSignUpPage />} />
        <Route path="/forgot-password" element={<PasswordResetRequestPage />} />
        <Route path="/password-reset/:token" element={<PasswordResetPage />} />
        <Route path="/about-us" element={<AboutUs />} />
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
          <Route path="/tasks/student" element={<PrivateRoute role="student"><ViewCurrentTasks /></PrivateRoute>} />
          <Route path="/tasks/faculty" element={<PrivateRoutes roles={['faculty', 'admin']}><ViewAssignedTasks /></PrivateRoutes>} />
          <Route path="/student-profile" element={<PrivateRoute role="student"><StudentProfile /></PrivateRoute>} />

          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:messageId" element={<Messages />} />


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
          <Route path="/post-job" element={<PrivateRoute role="faculty"><PostJob /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute roles={['faculty', 'student', 'admin']}><ViewJobs /></PrivateRoute>} />
          <Route path="/job-success" element={<PrivateRoute role="faculty"><PostJobSuccessPage /></PrivateRoute>} />
          <Route path="/edit-job/:jobId" element={<PrivateRoute role="faculty"><EditJobPage /></PrivateRoute>} />
          {/* Application Module */}
          <Route path="/application-form" element={<ApplicationPage />} />
          <Route path="/view-applications" element={<PrivateRoutes roles={['faculty', 'admin']}> <ViewApplicationsbyFacultyID /> </PrivateRoutes>} />
          <Route path="/view-application" element={<PrivateRoute role="student"> <ViewApplication /> </PrivateRoute>} />
          <Route path="/edit-application/:id" element={<PrivateRoute role="student"> <EditApplication /> </PrivateRoute>} />

          {/* Student Performance Review Module */}
          <Route path="/evaluate-performance" element={<PrivateRoute role="faculty"> <EvaluatePerformance /> </PrivateRoute>} />
          {/* <Route path="/performance-result/:id" element={<PrivateRoutePerformanceReview> 
            <PerformanceResult /> </PrivateRoutePerformanceReview>} /> */}
          <Route path="/performance-result" element={<PrivateRoute role="student"> <PerformanceResult /> </PrivateRoute>} />
          <Route path="/user-data" element={<UserDataPage />} />

          {/* FeedBack and Bug Report Module */}
          <Route path="/feedback" element={<MainLayout />}>
            <Route
              path="/feedback"
              element={<StudentFeatureRequestPage />}
            ></Route>
            <Route
              path="/feedback/:id"
              element={<IndividualFeedbackPage />}
            ></Route>
            <Route
              path="/feedback/admin"
              element={<AdminFeedbackPage />}
            ></Route>
          </Route>
          {/* admin resources */}
          <Route path="/students" element={<PrivateRoute role="admin"> <ViewStudents /> </PrivateRoute>} />
          <Route path="/faculties" element={<PrivateRoute role="admin"> <ViewFaculties /> </PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute role="admin"> <ViewCourses /> </PrivateRoute>} />
          <Route path="/course/:id" element={<PrivateRoute role="admin"> <CourseDetail /> </PrivateRoute>} />

          {/* 404 resources */}
          <Route path="/*" element={<UnauthorizedPage />} />
          

          </Route>
      </Routes>
    </Router>
  );
};

export default App;
