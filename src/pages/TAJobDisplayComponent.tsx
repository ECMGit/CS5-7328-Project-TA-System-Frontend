import React, { useState, useEffect } from 'react';
import AuthService from '../services/TAJobService'; // Update with your actual service for TA jobs
import TAJobComponent from '../components/TAJobComponent';

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
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    // Fetch all TA jobs on component mount
    AuthService.getTAJobs()
      .then(res => {
        // Assuming the data you need is located in `res.data`
        if (res.data) {
          setTAJobs(res.data);
        }
      })
      .catch(err => {
        console.error('An error occurred while fetching TA jobs:', err);
      });

    handleFetchJobs();
  }, []);

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

  const handleFetchJobs = async () => {
    try {
      // Define your filters based on the requirements. 
      const filters = {
        title: 'Assistant for CS101',
        totalHoursPerWeek: 20,
        courseId: 1,
      };

      const filteredJobs = await AuthService.fetchTAJobsWithFilters(filters);

      // Now 'filteredJobs' will contain the TA jobs that match the criteria.
      // You can set this to state or do whatever is needed in your application.
      console.log(filteredJobs);
    } catch (error) {
      console.error('Failed to fetch jobs with filters', error);
      // Handle the error appropriately.
    }
  };

  return (
    <div>
      <h1>TA Job Openings</h1>

      {/* Section to display all TA jobs */}
      <div>
        <h2>All Jobs:</h2>
        {taJobs.length > 0 ? (
          taJobs.map((job, index) => (
            <div key={index}>
              {/* Displaying some key information about each job using the TAJobComponent */}
              <TAJobComponent tajob={job}/>
              {/* <span><strong>Title:</strong> {job.title} ({job.id})</span><br />
              <span><strong>Course Schedule:</strong> {job.courseSchedule}</span> */}
            </div>
          ))
        ) : (
          <p>No job openings available.</p>
        )}
      </div>

      {/* Section to input an ID and fetch a specific job */}
      <div>
        <h2>Get Job Details by ID:</h2>
        <input
          type="text"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          placeholder="Enter Job ID"
        />
        <button onClick={handleGetJobById}>Get Job Details</button>

        {jobData && (
          <div>
            <h3>Job Details:</h3>
            {/* Displaying structured information about the selected job */}
            <p><strong>Title:</strong> {jobData.title}</p>
            <p><strong>Course Schedule:</strong> {jobData.courseSchedule}</p>
            <p><strong>Hours per Week:</strong> {jobData.totalHoursPerWeek}</p>
            <p><strong>Required Courses:</strong> {jobData.requiredCourses}</p>
            <p><strong>Skills:</strong> {jobData.requiredSkills}</p>
            <p><strong>Notes:</strong> {jobData.notes}</p>
            <p><strong>Deadline to Apply:</strong> {new Date(jobData.deadlineToApply).toDateString()}</p>
            {/* Add other fields of the job that you want to display */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TAJobDisplayComponent;

