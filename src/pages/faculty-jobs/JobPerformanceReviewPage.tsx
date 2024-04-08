import React, { useState } from 'react';
import {
  Container,
  Typography,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';

const marks = [
  { value: 0, label: '0: Completely Absent' },
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' },
  { value: 10, label: '10: Always Punctual' },
];

const PerformanceReview: React.FC = () => {
  const [teachingSkill, setTeachingSkill] = useState<number>(5);
  const [mentoringSkill, setMentoringSkill] = useState<number>(5);
  const [effectiveCommunication, setEffectiveCommunication] =
    useState<number>(5);
  const [comments, setComments] = useState<string>('');

  //Just example, real data get from the database
  const taInfo = {
    Name: 'John Doe',
    SMUid: 'TA01',
    Course: 'Cs01',
    Time: '2024	Spring',
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get a  taUserId and facultyUserId
    const taUserId = 8; // hardcode from database user table for testing
    const facultyUserId = 9; // hardcode from database user table for testing
    const courseId = 1;

    const evaluationData = {
      taUserId,
      facultyUserId,
      courseId,
      teachingSkill,
      mentoringSkill,
      effectiveCommunication,
      comments,
    };

    // POSt to the backend and fetch data
    try {
      const response = await fetch('http://localhost:9000/api/ta-performance/ta-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
      });


      if (response.ok) {
        alert('Evaluation submitted successfully');
      } else {
        const resJson = await response.json();
        alert('Failed to submit evaluation: ' + resJson.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit evaluation');
    }

  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        TA Performance Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={6} />
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box mb={4}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Teaching Skill
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Slider
                      value={teachingSkill}
                      onChange={(event, value) =>
                        setTeachingSkill(value as number)
                      }
                      aria-labelledby="teaching-skill-slider"
                      step={1}
                      marks={marks}
                      min={0}
                      max={10}
                      valueLabelDisplay="on"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={4}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Mentoring Skill
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Slider
                      value={mentoringSkill}
                      onChange={(event, value) =>
                        setMentoringSkill(value as number)
                      }
                      aria-labelledby="mentoring-skill-slider"
                      step={1}
                      marks={marks}
                      min={0}
                      max={10}
                      valueLabelDisplay="on"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={4}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Effective Communication
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Slider
                      value={effectiveCommunication}
                      onChange={(event, value) =>
                        setEffectiveCommunication(value as number)
                      }
                      aria-labelledby="effective-communication-slider"
                      step={1}
                      marks={marks}
                      min={0}
                      max={10}
                      valueLabelDisplay="on"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={4}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ mb: 4 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>

      {/* TA information box here */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="subtitle1">
          <span style={{ fontWeight: 'bold' }}>Name:</span> {taInfo.Name}
        </Typography>
        <Typography variant="subtitle1">
          <span style={{ fontWeight: 'bold' }}>SMU ID:</span> {taInfo.SMUid}
        </Typography>
        <Typography variant="subtitle1">
          <span style={{ fontWeight: 'bold' }}>Course:</span> {taInfo.Course}
        </Typography>
        <Typography variant="subtitle1">
          <span style={{ fontWeight: 'bold' }}>Job ID:</span> {taInfo.Time}
        </Typography>
      </Box>
    </Container>
  );
};

export default PerformanceReview;
