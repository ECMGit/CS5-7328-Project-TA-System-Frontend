import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ApplyService from '../../services/apply'; // Ensure this service is correctly implemented

// Define the TA application data type based on backend structure
interface TAApplicationData {
  courseId: number;
  studentId: number;
  hoursCanWorkPerWeek: string;
  coursesTaken: string;
  gpa: number;
  requiredCourses: string;
  requiredSkills: string;
  taJobId: number;
}

const ApplicationPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [taApplications, setTaApplications] = useState<TAApplicationData[]>([]);

  // Fetch TA applications when the component mounts or when the ID changes
  useEffect(() => {
    const fetchTaApplications = async () => {
      const studentId = Number(id);
      if (!studentId) {
        console.error('Invalid student ID provided');
        return;
      }
      try {
        const applications = await ApplyService.getTaApplicationsByStudentId(
          studentId
        );
        setTaApplications(applications);
      } catch (error) {
        console.error('Error fetching TA applications:', error);
      }
    };

    fetchTaApplications();
  }, [id]);

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          TA Applications
        </Typography>
        {taApplications.length > 0 ? (
          <List>
            {taApplications.map((app, index) => (
              <ListItem
                key={index}
                sx={{
                  mb: 2,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                }}
              >
                <ListItemText
                  primary={`Application for Course ID: ${app.courseId}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Student ID: {app.studentId}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        GPA: {app.gpa}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Hours Available: {app.hoursCanWorkPerWeek}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Courses Taken: {app.coursesTaken}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Required Courses: {app.requiredCourses}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Skills Required: {app.requiredSkills}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        TA Job ID: {app.taJobId}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No TA applications found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ApplicationPage;