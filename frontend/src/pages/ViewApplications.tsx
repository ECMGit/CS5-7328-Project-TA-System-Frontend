import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Title, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '../pages/user/styledComponents';
//this is the data type for the TAApplication table
type TAApplicationData = {
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

type TAJobData = {
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
  facultyId :number
};

type userData = {
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
const ViewApplications: React.FC = () => {
  //this is the state for the applications
  const [applications, setApplications] = useState<TAApplicationData[]>([]);
  //this is the state for the sort configuration
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);

  const [jobs, setJobs] = useState<TAJobData[]>([]);

  const [users, setUsers] = useState<userData[]>([]);



  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:9000/taApplication')
    //this is the response from the API
      .then(response => {
        //this is the data from the API
        setApplications(response.data);
        // console.log(response.data);
      })
      //error from the API
      .catch(error => {
        //this is the error message
        console.error('Error fetching data: ', error);
      });

    axios.get('http://localhost:9000/taJob').then(response => {
      //this is the data from the API
      setJobs(response.data);
      console.log(response.data);
    })
    //error from the API
      .catch(error => {
        //this is the error message
        console.error('Error fetching data: ', error);
      });

    // Fetch user data
    axios.get('http://localhost:9000/user')  // Adjust the endpoint if needed
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      
      });

  }, []);
  //this is the sorted applications
  const sortedApplications = useMemo(() => {
    if (!sortConfig) return applications;
    return [...applications].sort((a, b) => {
      // Added logic to sort by student name
      if (sortConfig.field === 'studentName') {
        const userA = users.find(u => u.id === a.studentId);
        const userB = users.find(u => u.id === b.studentId);
        const nameA = userA ? `${userA.firstName} ${userA.lastName}` : '';
        const nameB = userB ? `${userB.firstName} ${userB.lastName}` : '';
        if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
      } else if (sortConfig.field === 'TAStats') { // <-- Added this block
        const jobA = jobs.find(job => job.courseId === a.courseId);
        const jobB = jobs.find(job => job.courseId === b.courseId);
        const statusA = jobA ? jobA.TAStats : '';
        const statusB = jobB ? jobB.TAStats : '';
        if (statusA < statusB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (statusA > statusB) return sortConfig.direction === 'asc' ? 1 : -1;
      }
      else {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [applications, sortConfig, users,jobs]);
  //this is the request sort function
  const requestSort = (field: SortField) => {
    //this is the direction
    let direction: SortDirection = 'asc';
    //if the sort configuration exists, and the field is the same, and the direction is ascending, set the direction to descending
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'asc') {
      //set the direction to descending
      direction = 'desc';
    }
    //set the sort configuration
    setSortConfig({ field, direction });
  };

  return (
    <Container>
      <Title>View Applications for Course</Title>
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
            <TableHeader>Resume</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedApplications.map((application) => {
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
                  <Link to={`/application/${application.id}`}>View</Link>
                </TableCell>
              </TableRow>
            );
          })}

        </TableBody>
      </Table>
    </Container>
  );
};

export default ViewApplications;