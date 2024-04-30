import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
} from '@mui/material';
import TopNav from '../../components/TopNav';

// Define the TA application data type based on backend structure
interface TAApplicationData {
  id: number;
  courseId: number;
  studentId: number;
  hoursCanWorkPerWeek: string;
  coursesTaken: string;
  status: string;
  gpa: number;
  requiredCourses: string;
  requiredSkills: string;
  resumeFile: string;
  taJobId: number;
}

const ViewApplicationsByJobID: React.FC = () => {
  const location = useLocation();
  const { taApplications } = location.state as {
    taApplications: TAApplicationData[];
  };

  return (
    <div>
      <TopNav />
      <Container component="main" maxWidth="md">
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            TA Applications for Job ID: {taApplications[0]?.taJobId}
          </Typography>
          {taApplications.length > 0 ? (
            <List>
              {taApplications.map((app, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{ margin: '20px', padding: '20px' }}
                >
                  <ListItem
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '10px',
                    }}
                  >
                    <ListItemText
                      primary={`Application ID: ${app.id} - Course ID: ${app.courseId}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Student ID: {app.studentId} - GPA: {app.gpa}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Hours Can Work Per Week: {app.hoursCanWorkPerWeek}
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
                            Required Skills: {app.requiredSkills}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Resume:{' '}
                            <a
                              href={app.resumeFile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            {app.status === 'Pending' ? (
                              <Alert severity="warning">
                                Application Status: {app.status}
                              </Alert>
                            ) : app.status === 'Approved' ? (
                              <Alert severity="success">
                                Application Status: {app.status}
                              </Alert>
                            ) : app.status === 'Rejected' ? (
                              <Alert severity="error">
                                Application Status: {app.status}
                              </Alert>
                            ) : (
                              <Alert severity="info">
                                Application Status: {app.status}
                              </Alert>
                            )}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography>No TA applications found for job ID.</Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ViewApplicationsByJobID;
