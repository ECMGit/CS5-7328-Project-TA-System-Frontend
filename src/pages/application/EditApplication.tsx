import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import ApplyService from '../../services/apply';
import useAutoLogout from '../../components/AutoLogOut';

const EditApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    resume: null, // This should be the file path or name initially
    GPA: '',
    hoursCanWorkPerWeek: '',
    requiredCourses: '',
    requiredSkills: '',
    // Add other fields as necessary
  });

  // Load application data
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          console.error('No application ID provided');
          return;
        }
        const data = await ApplyService.fetchApplication(id);
        console.log(data);
        setApplication(data);
      } catch (error) {
        // Handle the error as needed
        console.error('Error loading application', error);
      }
    };

    loadData();
  }, [id]);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplication({
      ...application!,
      [e.target.name]: e.target.value,
    });
  };
  const { Modal, closeModal } = useAutoLogout();
  // // Handle file change
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setApplication({ ...application, resume: e.target.files[0] });
  //   } else {
  //     setApplication({ ...application, resume: null });
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('resumeFile', application.resume);
    // for (const [key, value] of Object.entries(application)) {
    //   if (value !== null) {
    //     formData.append(key, value);
    //   }
    // }

    try {
      if (id) {
        await ApplyService.updateApplication(id, Number(application.GPA), application.hoursCanWorkPerWeek, 
          application.requiredCourses, application.requiredSkills);
        navigate('/view-applications');
      }
    } catch (error) {
      console.error('Error updating application', error);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        if (id) {
          await ApplyService.deleteApplication(id);
        }
        navigate('/view-applications');
      } catch (error) {
        console.error('Error deleting application', error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Edit Application
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          {/*
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            name="resume"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" sx={{ mt: 3, mb: 2 }}>
              Upload Resume
            </Button>
          </label>
          <br /> 
          */}

          <TextField
            margin="normal"
            required
            fullWidth
            name="GPA"
            label="GPA"
            type="number"
            value={application.GPA}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="hoursCanWorkPerWeek"
            label="Hours per Week"
            type="text"
            value={application.hoursCanWorkPerWeek}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="requiredCourses"
            label="Required Courses"
            type="text"
            value={application.requiredCourses}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="requiredSkills"
            label="Required Skills"
            type="text"
            value={application.requiredSkills}
            onChange={handleInputChange}
          />
          
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Update Application
          </Button>
          <Button fullWidth variant="outlined" color="secondary" onClick={handleDelete} sx={{ mt: 1 }}>
            Delete Application
          </Button>
        </Box>
      </Box>
      {Modal}
    </Container>
  );
};

export default EditApplication;
