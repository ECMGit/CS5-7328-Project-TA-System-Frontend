import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createTaEvaluation } from '../../services/evaluate';

import {
  Container,
  Typography,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';

const PerformanceReview: React.FC = () => {
  const location = useLocation();
  const taInfo = location.state?.taInfo;

  const [teachingSkill, setTeachingSkill] = useState<number>(5);
  const [mentoringSkill, setMentoringSkill] = useState<number>(5);
  const [effectiveCommunication, setEffectiveCommunication] = useState<number>(5);
  const [comments, setComments] = useState<string>('');

  const marks = [
    { value: 0, label: '0: Completely Absent' },
    { value: 2, label: '2' },
    { value: 4, label: '4' },
    { value: 6, label: '6' },
    { value: 8, label: '8' },
    { value: 10, label: '10: Always Punctual' },
  ];


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (taInfo) {
        const evaluationData = {
          taUserId: taInfo.userId, // Assuming taInfo has userId
          facultyUserId: taInfo.facultyId, // Assuming taInfo has facultyId
          courseId: taInfo.courseId,
          teachingSkill,
          mentoringSkill,
          effectiveCommunication,
          comments,
        };

        try {
          await createTaEvaluation(evaluationData);
          alert('Evaluation submitted successfully');
        } catch (error) {
          console.error('Error:', error);
          alert('Error occurred during submission');
        }
      } else {
        alert('TA information is not available');
      }
    };

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
          <Typography variant="h4" align="center" gutterBottom>
            TA Performance Review
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={6}/>
            <Box sx={{mb: 4}}>
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
                            sx={{mb: 4}}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
          {taInfo && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <Typography variant="subtitle1"><span style={{fontWeight: 'bold'}}>Name:</span> {taInfo.username}
                </Typography>
                <Typography variant="subtitle1"><span style={{fontWeight: 'bold'}}>SMU ID:</span> {taInfo.smuNo}
                </Typography>
                <Typography variant="subtitle1"><span style={{fontWeight: 'bold'}}>Course:</span> {taInfo.courseName}
                </Typography>
                <Typography variant="subtitle1"><span style={{fontWeight: 'bold'}}>Course ID:</span> {taInfo.courseId}
                </Typography>
              </Box>
          )}
        </Container>
    );
  };

export default PerformanceReview;
