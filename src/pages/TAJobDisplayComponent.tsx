import React, { useState, useEffect, useContext } from 'react';
import TAJobService from '../services/tajob'; // Update with your actual service for TA jobs
import TAJobComponent from '../components/TAJobComponent';
import { Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../provider'; // update user context

// Update User interface to include userType
interface User {
  username: string;
  userType: string; // Assuming userType is a string
}

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
  const [taJobs, setTAJobs] = useState<TAJobs[]>([]); // Now taJobs is an array of TAJobs
  const [selectedId, setSelectedId] = useState('');
  
  useEffect(() => {
    // Fetch all TA jobs on component mount
    TAJobService.getTAJobs()
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

  const handleFetchJobs = async () => {
    try {
      // Define your filters based on the requirements. 
      const filters = {
        title: 'Assistant for CS101',
        totalHoursPerWeek: 20,
        courseId: 1,
      };

      const filteredJobs = await TAJobService.fetchTAJobsWithFilters(filters);

      // Now 'filteredJobs' will contain the TA jobs that match the criteria.
      // You can set this to state or do whatever is needed in your application.
      console.log(filteredJobs);
    } catch (error) {
      console.error('Failed to fetch jobs with filters', error);
      // Handle the error appropriately.
    }
  };

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { user, setUser } = userContext;

  if (!user) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const { role } = user;
  
  //functions to sort the job listings by options in dropdown menu
  const sortJobsByTitle = (taJobs: TAJobs[]) => {
    const sortedJobs = [...taJobs];
  
    sortedJobs.sort((jobA, jobB) => {
      const titleA = jobA.title.toUpperCase(); 
      const titleB = jobB.title.toUpperCase();
  
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedJobs;
  };
  const sortJobsByCourseID = (taJobs: TAJobs[]) => {
    const sortedJobs = [...taJobs];
  
    sortedJobs.sort((jobA, jobB) => {
      const titleA = jobA.courseId;
      const titleB = jobB.courseId;

      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedJobs;
  };
  const sortJobsByProf = (taJobs: TAJobs[]) => {
    const sortedJobs = [...taJobs];
  
    sortedJobs.sort((jobA, jobB) => {
      const titleA = jobA.facultyId; 
      const titleB = jobB.facultyId;
  
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedJobs;
  };
  const sortJobsBySchedule = (taJobs: TAJobs[]) => {
    const sortedJobs = [...taJobs];
  
    sortedJobs.sort((jobA, jobB) => {
      const titleA = jobA.courseSchedule; 
      const titleB = jobB.courseSchedule;
  
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedJobs;
  };
  

  const [selectedOption, setSelectedOption] = useState('');
  
  // Function to handle the dropdown change
  const handleDropdownChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };
  
  // Function to handle the form submission for selecting which option to sort by
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    //sort the courses based on selection
    
    let sortedJobs: TAJobs[] = [];

    switch (selectedOption) {
    case 'Course ID':
      sortedJobs = sortJobsByCourseID(taJobs);
      break;
    case 'Professor':
      sortedJobs = sortJobsByProf(taJobs);
      break;
    case 'Schedule':
      sortedJobs = sortJobsBySchedule(taJobs);
      break;
    case 'Title':
      sortedJobs = sortJobsByTitle(taJobs);
      break;
    default:
      break;
    }
    setTAJobs(sortedJobs);
  };

  return (
    <div>
      <h1>TA Job Openings</h1>

      {/* Section to display all TA jobs */}
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
            Sort By:
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="">Sort By</option>
                <option value="Course ID">Course ID</option>
                <option value="Professor">Professor</option>
                <option value="Schedule">Schedule</option>
                <option value="Title">Title</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <h2>All Jobs:</h2>
        {taJobs.length > 0 && user && role === 'student' ? (
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
    </div>
  );
};

export default TAJobDisplayComponent;

