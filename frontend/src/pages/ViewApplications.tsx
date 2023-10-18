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
}

//these are the fields that can be sorted
type SortField = 'studentId' | 'hoursCanWorkPerWeek' | 'GPA';
//these are the directions that can be sorted
type SortDirection = 'asc' | 'desc';
//this is the ViewApplications component
const ViewApplications: React.FC = () => {
  //this is the state for the applications
  const [applications, setApplications] = useState<TAApplicationData[]>([]);
  //this is the state for the sort configuration
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);

  const [jobs, setJobs] = useState<TAJobData[]>([]);


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

  }, []);
  //this is the sorted applications
  const sortedApplications = useMemo(() => {
    //if there is no sort configuration, return the applications
    if (!sortConfig) return applications;
    //otherwise, sort the applications
    return [...applications].sort((a, b) => {
      //get the values for the sort configuration
      const aValue = a[sortConfig.field];
      //get the values for the sort configuration
      const bValue = b[sortConfig.field];
      //if the aValue is less than the bValue, return -1
      if (aValue < bValue) {
        //if the direction is ascending, return -1, otherwise return 1
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      //if the aValue is greater than the bValue, return 1
      if (aValue > bValue) {
        //if the direction is ascending, return 1, otherwise return -1
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      //otherwise, return 0
      return 0;
    });
    //if the applications change, return the applications
  }, [applications, sortConfig]);
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
            <TableHeader>Course ID</TableHeader>
            <TableHeader>Student Name</TableHeader>
            <TableHeader>Status</TableHeader>
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
            
            return (
              <TableRow key={application.id}>
                <TableCell>
                  <Link to={`/student/${application.studentId}`}>{application.studentId}</Link>
                </TableCell>
                <TableCell>{application.courseId}</TableCell>
                <TableCell>student</TableCell>
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