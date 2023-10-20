import React, { useState, useEffect } from 'react';
import AuthService from '../services/TAJobService'; // Update with your actual service for TA jobs
import TAJobComponent from '../components/TAJobComponent';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';

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


const TAJobDisplayComponent = () => {
  const [taJobs, setTAJobs] = useState<TAJobs[]>([]); // Now taJobs is an array of TAJobs
  const [jobData, setJobData] = useState<TAJobs | null>(null); // jobData is a single TAJobs object or null  
  // Not used for now for testing purposes 
  const [selectedId, setSelectedId] = useState('');

  const navigate = useNavigate();

  const jobData2 = {
    id: 1,
    title: 'Test Class',
    courseId: 1,
    courseSchedule: 'Always',
    totalHoursPerWeek: 40,
    maxNumberOfTAs: 1,
    requiredCourses: 'All of them',
    requiredSkills: 'Become God',
    TAStats: 'All of the stats',
    notes: 'You cannot feasibly get this position',
    deadlineToApply: 'Right now',
    facultyId: 1234};

  const handleGetJobById = () => {
    if (selectedId.trim() === '') return;

    AuthService.getTAJobById(selectedId)
      .then(res => {
        // Handling the response by setting it to state
        if (res.data) {
          setJobData(res.data);
        }
      })
      .catch(err => {
        console.error(`An error occurred while fetching TA job with ID ${selectedId}:`, err);
      });
  };

  return (
    
    <div>
      {jobData2 && (<h1><strong>Title:</strong> {jobData2.title}</h1>)}
      {/* Section to input an ID and fetch a specific job */}
      <div>
        {jobData2 && (
          <div>
            <h3>Job Details:</h3>
            {/* Displaying structured information about the selected job */}
            <p><strong>Course Schedule:</strong> {jobData2.courseSchedule}</p>
            <p><strong>Hours per Week:</strong> {jobData2.totalHoursPerWeek}</p>
            <p><strong>Required Courses:</strong> {jobData2.requiredCourses}</p>
            <p><strong>Skills:</strong> {jobData2.requiredSkills}</p>
            <p><strong>Notes:</strong> {jobData2.notes}</p>
            <p><strong>Deadline to Apply:</strong> {new Date(jobData2.deadlineToApply).toDateString()}</p>
            {/* Add other fields of the job that you want to display */}
          </div>
        )}
        <button onClick={() => {navigate('/apply');/* window.location.reload();*/}}>Apply to Job</button>
      </div>
    </div>
  );
};

export default TAJobDisplayComponent;

