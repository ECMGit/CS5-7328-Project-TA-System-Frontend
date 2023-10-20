import React, { useState, useEffect, useMemo,  } from 'react';
import ReactSlider from 'react-slider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MockResume from './MockResume'; //This import is used so that we can display additional application details for a particular applicant
import { Container, Title, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Navbar, NavbarButton } from '../pages/user/styledComponents';
// Define the data structure for a TA Application entry that we will get from database
export type TAApplicationData = 
{
  //id is the primary key for the table
  id: number;
  courseId: number;
  studentId: number;
  hoursCanWorkPerWeek: number;
  coursesTaken: string;
  GPA: number;
  requiredCourses: string;
  requiredSkills: string;
  resumeFile: string;
  taJobId: number;
  TAStats:string;
};
// Define the data structure for a TA Job entry that we will get from database
type TAJobData = 
{
  id: number  
  title: string
  courseId: number;
  courseSchedule:string
  totalHoursPerWeek:number
  maxNumberOfTAs:number
  requiredCourses:string
  requiredSkills:string
  TAStats:string 
  notes:string
  facultyId :number //We can use the faculty Id number to associate a particular TaJob with a particular application. 
};
// Define the data structure for a User entry that we will get from database

type userData = 
{
  id               :number       
  smuNo            :number
  username         :string    
  email            :string    
  firstName        :string
  lastName         :string
  password         :string
  resetToken       :string
  resetTokenExpiry :number
  updatedAt        :Date

}

//these are the fields that can be sorted
type SortField = 'studentId' | 'courseId' | 'hoursCanWorkPerWeek' | 'GPA' | 'studentName' | 'TAStats'; // <-- Added 'TAStats'

//these are the directions that can be sorted
type SortDirection = 'asc' | 'desc';

//this is the ViewApplications component
const ViewApplications: React.FC = () => 
{
  
  //this is the state for the applications
  const [applications, setApplications] = useState<TAApplicationData[]>([]);
  
  //this is the state for the sort configuration
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);
  //The below is the state for the list of jobs
  const [jobs, setJobs] = useState<TAJobData[]>([]);
  //The below is for holding the list of users 
  const [users, setUsers] = useState<userData[]>([]);
  //The below is for holding the selected job status for filtering
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  //The below is for holding a list of the unique statuses (undergraduate or graduate)
  const [uniqueStatuses, setUniqueStatuses] = useState<string[]>([]);
  //This stores the search term when searching for student name 
  const [searchTerm, setSearchTerm] = useState<string>('');
  //The below stores the GPA Range for filtering (not yet fully implemented)
  const [gpaRange, setGpaRange] = useState({ min: 0, max: 4.0 });
  //The below stores the current selected applications
  const [currentApplication, setCurrentApplication] = useState<TAApplicationData | null>(null);
  const [facultyFilter, setFacultyFilter] = useState<number | null>(null);

  //Fetching the data from the API
  useEffect(() => 
  {
    // Fetch data from API regarding the TA Application. 
    axios.get('http://localhost:9000/taApplication')
    //this is the response from the API
      .then(response => 
      {
        //this is the data from the API
        setApplications(response.data);
        // console.log(response.data);
      })
      //error from the API
      .catch(error => 
      {
        
        console.error('Error fetching data: ', error);
      });

    axios.get('http://localhost:9000/taJob').then(response => 
    {
      //this is the data from the API
      setJobs(response.data);
      const statuses = Array.from(new Set(response.data.map((job: TAJobData) => job.TAStats))) as string[];
      setUniqueStatuses(statuses);

      console.log(response.data);
    })
    //error from the API
      .catch(error => 
      {
        
        console.error('Error fetching data: ', error);
      });

    // Fetch user data
    axios.get('http://localhost:9000/user')  
      .then(response => 
      {
        setUsers(response.data);
      })
      .catch(error => 
      {
        console.error('Error fetching user data: ', error);
      
      });

  }, []);
    
  
  // Handle viewing specific student application details
  const handleViewClick = (studentId: number) => 
  {
    const selectedApplication = applications.find(app => app.studentId === studentId);
    if (selectedApplication) 
    {
      setCurrentApplication(selectedApplication);
    } else 
    {
    // Handle the case when the application is not found
      console.error(`Application for studentId ${studentId} not found.`);
    }
  };


  // Handle The search term change when searching for a particular student name
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    setSearchTerm(e.target.value);
  };

  //The following logic sorts the applications based on the field and direction specified in the sortConfig. 
  //If the field is 'studentName', it finds the associated user and sorts by their name. For the 'TAStats' field, it sorts based on the status of the associated TA job. 
  //If neither, it uses direct property comparison of the applications. 
  //This sorting is beneficial when presenting tabular data where the user might want to order the results based on various columns, like student name or TA status, for better readability or analysis.
  const sortedAndFilteredApplications = useMemo(() => 
  {
    let sorted = [...applications];
  
    // Faculty Filtering Logic
    if (facultyFilter !== null) 
    {
      sorted = sorted.filter(application => {
        const matchingJob = jobs.find(job => job.id === application.taJobId);
        return matchingJob && matchingJob.facultyId === facultyFilter;
      });
    }


    // Sorting Logic
    if (sortConfig) 
    {
      sorted = sorted.sort((a, b) => 
      {
        if (sortConfig.field === 'studentName') 
        {
          const userA = users.find(u => u.id === a.studentId);
          const userB = users.find(u => u.id === b.studentId);
          const nameA = userA ? `${userA.firstName} ${userA.lastName}` : '';
          const nameB = userB ? `${userB.firstName} ${userB.lastName}` : '';
          if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
        } else if (sortConfig.field === 'TAStats') 
        {
          const jobA = jobs.find(job => job.courseId === a.courseId);
          const jobB = jobs.find(job => job.courseId === b.courseId);
          const statusA = jobA ? jobA.TAStats : '';
          const statusB = jobB ? jobB.TAStats : '';
          if (statusA < statusB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (statusA > statusB) return sortConfig.direction === 'asc' ? 1 : -1;
        } else 
        {
          const aValue = a[sortConfig.field];
          const bValue = b[sortConfig.field];
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // The following logic filters the list of applications based on a provided search term. 
    //First, the search term is converted to lowercase to ensure case-insensitive searching. 
    //For each application, the associated user and job details are retrieved. 
    //The logic then checks if the user's name, job status, or any property within the application includes the search term. 
    //This search functionality helps users narrow down the list of applications to those that match specific criteria, aiding in quickly identifying and reviewing relevant entries.

    if (searchTerm) 
    {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      sorted = sorted.filter(application => {
        const user = users.find(u => u.id === application.studentId);
        const job = jobs.find(job => job.courseId === application.courseId);

        const name = user ? `${user.firstName} ${user.lastName}` : '';
        const status = job ? job.TAStats : '';
        
        return name.toLowerCase().includes(lowercasedSearchTerm) || 
               status.toLowerCase().includes(lowercasedSearchTerm) ||
               Object.values(application).some(val => 
                 String(val).toLowerCase().includes(lowercasedSearchTerm)
               );
      });
    }
  
    // Filtering Logic
    if (selectedStatus) 
    {
      sorted = sorted.filter(application => 
      {
        const matchingJob = jobs.find(job => job.courseId === application.courseId);
        return matchingJob && matchingJob.TAStats === selectedStatus;
      });
    }

    // GPA Filtering Logic
    sorted = sorted.filter(application => 
    {
      const user = users.find(u => u.id === application.studentId);
      // Assuming each user has a 'gpa' field
      return user && application.GPA >= gpaRange.min && application.GPA <= gpaRange.max;
    });
  
    return sorted;
  }, [applications, sortConfig, users, jobs, selectedStatus, searchTerm,gpaRange, facultyFilter]);
  
  //this is the request sort function. It determines what direction to set sorting
  const requestSort = (field: SortField) => 
  {
    //this is the direction
    let direction: SortDirection = 'asc';
    //if the sort configuration exists, and the field is the same, and the direction is ascending, set the direction to descending
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'asc') 
    {
      //set the direction to descending
      direction = 'desc';
    }
    //set the sort configuration
    setSortConfig({ field, direction });
  };


  //This section involves the formatting and rendering of al the data and logic defined above. 
  return (
    <Container>
      <Navbar>
        
        <NavbarButton onClick={() => 
        {
          // You can add an onClick handler here, if you want the button to navigate or perform an action.
        }}>
        View TA Applications
        </NavbarButton>
        <NavbarButton onClick={() => 
        {
        // View Applications from Faculty 1's Point of View if he were logged in
          setFacultyFilter(1);
        }}>
          Faculty 1 Log In View
        </NavbarButton>
        <NavbarButton onClick={() => 
        {
          // Clear the faculty filter.
          setFacultyFilter(null);
        }}>
        Clear Faculty Filter
        </NavbarButton>

      </Navbar>
      <Title>View Applications for Course</Title>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', left: '0%' }}>
        <div style={{ flexGrow: 2.5 }}></div> {/* Placeholder divs to position the select */}
        <div style={{ flexGrow: 0.5 }}>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', left: '0%' }}>
          <select
            value={selectedStatus || ''}
            onChange={e => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status Option</option>
            {uniqueStatuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div >
        



        
        <div style={{ flexGrow: 5 }}></div> {/* Placeholder divs to take up remaining space */}
      </div>
      

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader onClick={() => requestSort('studentId')}>
              Student ID
              {sortConfig?.field === 'studentId' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </TableHeader>
            <TableHeader onClick={() => requestSort('courseId')}> {/* Updated this line */}
              Course ID
              {sortConfig?.field === 'courseId' && (sortConfig.direction === 'asc' ? '▲' : '▼')} {/* Updated this line */}
            </TableHeader>
            <TableHeader onClick={() => requestSort('studentName')}>
              Student Name
              {sortConfig?.field === 'studentName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </TableHeader>

            <TableHeader onClick={() => requestSort('TAStats')}> {/* <-- Updated this line */}
            Status
              {sortConfig?.field === 'TAStats' && (sortConfig.direction === 'asc' ? '▲' : '▼')} {/* <-- Updated this line */}
            </TableHeader>
            <TableHeader onClick={() => requestSort('hoursCanWorkPerWeek')}>
              Hours/Week
              {sortConfig?.field === 'hoursCanWorkPerWeek' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </TableHeader>
            <TableHeader onClick={() => requestSort('GPA')}>
              GPA
              {sortConfig?.field === 'GPA' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </TableHeader>
            <TableHeader>More Application Details</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAndFilteredApplications.map((application) => {
            // Find the corresponding job using courseId
            const matchingJob = jobs.find(job => job.courseId === application.courseId);
            const user = users.find(u => u.id === application.studentId);

            return (
              <TableRow key={application.id}>
                <TableCell>
                  <Link to={`/student/${application.studentId}`}>{application.studentId}</Link>
                </TableCell>
                <TableCell>{application.courseId}</TableCell>
                <TableCell>{user ? `${user.firstName} ${user.lastName}` : 'N/A'}</TableCell>

                <TableCell>{matchingJob ? matchingJob.TAStats : 'N/A'}</TableCell>
                <TableCell>{application.hoursCanWorkPerWeek}</TableCell>
                <TableCell>{application.GPA}</TableCell>
                
                <TableCell>
                  <a href="#" onClick={() => handleViewClick(application.studentId)}>View</a>
                </TableCell>
              </TableRow>
              
            );
          })}

        </TableBody>
      </Table>
      <div>
        {/*The below displays additional application details for the selected application */}
        {currentApplication && <MockResume application={currentApplication} />}
      </div>
    </Container>
  );
};

export default ViewApplications;