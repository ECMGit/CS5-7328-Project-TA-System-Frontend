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

      {/*}
      code to handle filtering functions
          <Box sx={{ display: "flex", marginTop: "1rem" }} >
            {screenWidth > 450 ? <Box sx={{ marginLeft: "2rem" }}>
                <Button variant="contained" sx={{ width: "100%", marginBottom: "1rem" }} onClick={handlePostClick}>Post</Button>
                <Typography sx={{ color: "black", fontSize: 24, fontWeight: "bold", textAlign: "left" }}>
                  Filter:
                </Typography>
                <FormGroup>
                  {categories.map((category, index) => <FormControlLabel control={<Checkbox disabled={updatingFilter} onChange={() => handleCheckboxChange(category)} checked={checked[category.name]} />} label={`${category.name} (${category.num_posts})`} />)}
                </FormGroup>
              </Box> : null}
            <Box sx={{ display: "block", width: "100%" }}>
              {
                taJobs.filter((p) => p.is_pinned).map((post, index) => <Post key={index} post={post} user={props.user} />)
              }
              {
                taJobs.filter((p) => !p.is_pinned).map((post, index) => <Post key={index} post={post} user={props.user} />)
              }
            </Box>
            </Box>
            </>*/}
      {/*<DataGrid
          initialState={{
            filter: {
              filterModel: {
                items: [{ field: 'rating', operator: '>', value: '2.5' }],
              },
            },
          }}
        />*/}

      {/*<h2>Get Jobs by Filters:</h2>
        <input
          type="text"
          value={selectedID}
          onChange={(e) => setSelectedId(e.target.value)}
          placeholder="Enter filter value"
        />
        <button onClick={handleFetchTAJobsWithFilters}>Get Job Details</button>
        */}
    </div>
  );
};

export default TAJobDisplayComponent;

