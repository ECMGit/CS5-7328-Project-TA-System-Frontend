import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/taskform';
import { UserContext } from '../../provider';
import { Grid, Button, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import MUI Icon for back button
import { Link, useNavigate } from 'react-router-dom';

interface Task {
  facultyId: number;
  studentId: number;
  title: string;
  description: string | null;
  TaskId: number;
  completed: boolean;
  courseId: number;
  course: {
    courseCode: string;
    title: string;
  };
}

const ViewCurrentTasks: React.FC = () => {
  const userContext = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const storedUser = localStorage.getItem('user');
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      if (storedUser) {
        const userId = JSON.parse(storedUser).smuNo;
        setUserId(userId);
        const responseObj = await api.viewCurrent(userId);
        setTasks(responseObj);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [storedUser]);

  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        {' '}
        {/* Back button with navigate */}
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h2" gutterBottom align="center">
        Current Tasks
      </Typography>
      {tasks.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    Task ID
                  </th>
                  <th
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.TaskId} style={{ backgroundColor: 'white' }}>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #ddd',
                        textAlign: 'left',
                      }}
                    >
                      {task.TaskId}
                    </td>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #ddd',
                        textAlign: 'left',
                      }}
                    >
                      {task.title}
                    </td>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #ddd',
                        textAlign: 'left',
                      }}
                    >
                      {task.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              component={Link}
              to="/home"
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Home
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
          No Tasks Available
        </Typography>
      )}
    </Box>
  );
};

export default ViewCurrentTasks;