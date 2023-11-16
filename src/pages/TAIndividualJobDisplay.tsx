import React, { useState, useEffect, useContext } from 'react';
import AuthService from '../services/tajob'; // Update with your actual service for TA jobs
import TAJobComponent from '../components/TAJobComponent';
import { title } from 'process';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Typography, Container, Button, Paper } from '@mui/material';
import { UserContext } from '../provider'; // Adjust the path accordingly
// Update User interface to include userType

interface TAJobs {
  id: number;
  title: string;
  courseId: number;
  courseSchedule: string;
  totalHoursPerWeek: number;
  maxNumberOfTAs: number;
  requiredCourses: string;
  requiredSkills: string;
  TAStats: string;
  notes: string;
  deadlineToApply: string; // or Date, if it's already a Date object
  facultyId: number;
}
interface User {
  username: string;
  userType: string; // Assuming userType is a string
}

const TAJobDisplayComponent = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContext;

  if (!user) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { role } = user;
  const [taJobs, setTAJobs] = useState<TAJobs[]>([]); // Now taJobs is an array of TAJobs
  // jobData is a single TAJobs object or null
  const [jobData, setJobData] = useState<TAJobs | null>(null);
  // Not used for now for testing purposes
  const { id } = useParams(); // Get the job ID from the route parameter
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the job data based on the ID from the route parameter
    if (id) {
      const numericId = parseInt(id, 10);
      AuthService.getTAJobById(numericId)
        .then((res) => {
          if (res.data) {
            setJobData(res.data);
          }
        })
        .catch((err) => {
          console.error(`An error occurred while fetching TA job with ID ${id}:`, err);
        });
    }
  }, [id]);

  return (
    <div>
      {jobData && user && role === 'student' && (
        <h1>
          <strong>Title:</strong> {jobData.title}
        </h1>
      )}
      {/* Section to input an ID and fetch a specific job */}
      <div>
        {jobData && (
          <div>
            <h3>Job Details:</h3>
            {/* Displaying structured information about the selected job */}
            <p>
              <strong>Course Schedule:</strong> {jobData.courseSchedule}
            </p>
            <p>
              <strong>Hours per Week:</strong> {jobData.totalHoursPerWeek}
            </p>
            <p>
              <strong>Required Courses:</strong> {jobData.requiredCourses}
            </p>
            <p>
              <strong>Skills:</strong> {jobData.requiredSkills}
            </p>
            <p>
              <strong>Notes:</strong> {jobData.notes}
            </p>
            <p>
              <strong>Deadline to Apply:</strong> {new Date(jobData.deadlineToApply).toDateString()}
            </p>
            {/* Add other fields of the job that you want to display */}
          </div>
        )}
        <button
          onClick={() => {
            navigate('/apply'); /* window.location.reload();*/
          }}
        >
          Apply to Job
        </button>
      </div>
    </div>
  );
};

export default TAJobDisplayComponent;
