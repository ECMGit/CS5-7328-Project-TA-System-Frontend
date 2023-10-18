import React, { useState, useEffect, useMemo } from 'react';
import { Container, Title, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Link } from '../pages/user/styledComponents';

// Define the application type
type TAApplicationType = {
  id: number;
  courseId: number;
  studentId: number;
  hoursCanWorkPerWeek: number;
  GPA: number;
  resumeFile: string;
  student: {
    smuNo: number;
    firstName: string;
    lastName: string;
  };
  course: {
    title: string;
  };
  status: string; // This can be an enum or a string based on the application's status
};

// Mock data (assuming you only want a few fields for the mock)
const mockApplications: TAApplicationType[] = [
  {
    id: 1,
    courseId: 1,
    studentId: 1,
    hoursCanWorkPerWeek: 10,
    GPA: 3.5,
    resumeFile: "/path/to/resume1.pdf",
    student: {
      smuNo: 1,
      firstName: "John",
      lastName: "Doe",
    },
    course: {
      title: "CSE101",
    },
    status: "Pending", // This would need to be added to your SQL structure or fetched from an API.
  },
  {
    id: 2,
    courseId: 2,
    studentId: 2,
    hoursCanWorkPerWeek: 12,
    GPA: 3.8,
    resumeFile: "/path/to/resume2.pdf",
    student: {
      smuNo: 2,
      firstName: "Jane",
      lastName: "Doe",
    },
    course: {
      title: "CSE102",
    },
    status: "Approved", // As an example status.
  },
  {
    id: 3,
    courseId: 3,
    studentId: 3,
    hoursCanWorkPerWeek: 10,
    GPA: 3.7,
    resumeFile: "/path/to/resume3.pdf",
    student: {
      smuNo: 3,
      firstName: "Alice",
      lastName: "White",
    },
    course: {
      title: "CSE103",
    },
    status: "Rejected", // As another example status.
  },
  // Add two more mock applications below:
  {
    id: 4,
    courseId: 4,
    studentId: 4,
    hoursCanWorkPerWeek: 15,
    GPA: 3.9,
    resumeFile: "/path/to/resume4.pdf",
    student: {
      smuNo: 4,
      firstName: "Bob",
      lastName: "Smith",
    },
    course: {
      title: "CSE104",
    },
    status: "Approved", // Example status.
  },
  {
    id: 5,
    courseId: 5,
    studentId: 5,
    hoursCanWorkPerWeek: 8,
    GPA: 3.6,
    resumeFile: "/path/to/resume5.pdf",
    student: {
      smuNo: 5,
      firstName: "Charlie",
      lastName: "Brown",
    },
    course: {
      title: "CSE105",
    },
    status: "Pending", // Example status.
  },
  // ... add more mock applications as needed based on the inserts you've provided ...
];

type SortField = "student.smuNo" | "student.firstName" | "status" | "hoursCanWorkPerWeek" | "GPA";
type SortDirection = "asc" | "desc";

const ViewApplications: React.FC = () => {
  const [applications, setApplications] = useState<TAApplicationType[]>([]);
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);

  useEffect(() => {
    setApplications(mockApplications);
  }, []);

  const sortedApplications = useMemo(() => {
    if (!sortConfig) return applications;
  
    return [...applications].sort((a, b) => {
      // Extract nested values when necessary
      const aValue = sortConfig.field.split('.').reduce<any>((obj, key) => obj[key as keyof typeof obj], a);
const bValue = sortConfig.field.split('.').reduce<any>((obj, key) => obj[key as keyof typeof obj], b);


  
      if (sortConfig.direction === "asc") {
        if (typeof aValue === 'string') {
          return aValue.localeCompare(bValue);
        } else {
          return aValue - bValue;
        }
      } else {
        if (typeof aValue === 'string') {
          return bValue.localeCompare(aValue);
        } else {
          return bValue - aValue;
        }
      }
    });
  }, [applications, sortConfig]);
  

  const requestSort = (field: SortField) => {
    let direction: SortDirection = "asc";
    if (sortConfig?.field === field && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  return (
    <Container>
      <Title>View Applications for Course</Title>
      <Table>
        <TableHead>
          <TableRow>
          <TableHeader onClick={() => requestSort("student.smuNo")}>
  Student ID
  {sortConfig?.field === "student.smuNo" && (sortConfig.direction === "asc" ? '▲' : '▼')}
</TableHeader>

            <TableHeader onClick={() => requestSort("student.firstName")}>
              Student Name
              {sortConfig?.field === "student.firstName" && (sortConfig.direction === "asc" ? '▲' : '▼')}
            </TableHeader>
            <TableHeader onClick={() => requestSort("status")}>
              Status
              {sortConfig?.field === "status" && (sortConfig.direction === "asc" ? '▲' : '▼')}
            </TableHeader>
            <TableHeader onClick={() => requestSort("hoursCanWorkPerWeek")}>
              Hours/Week
              {sortConfig?.field === "hoursCanWorkPerWeek" && (sortConfig.direction === "asc" ? '▲' : '▼')}
            </TableHeader>
            <TableHeader onClick={() => requestSort("GPA")}>
              GPA
              {sortConfig?.field === "GPA" && (sortConfig.direction === "asc" ? '▲' : '▼')}
            </TableHeader>
            <TableHeader>View</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedApplications.map(app => (
            <TableRow key={app.id}>
              <TableCell>
                <Link href={`studentProfile/${app.student.smuNo}`}>{app.student.smuNo}</Link>
              </TableCell>
              <TableCell>{app.student.firstName} {app.student.lastName}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.hoursCanWorkPerWeek}</TableCell>
              <TableCell>{app.GPA}</TableCell>
              <TableCell>
                <Link href={`application/${app.id}`}>View Application</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ViewApplications;


