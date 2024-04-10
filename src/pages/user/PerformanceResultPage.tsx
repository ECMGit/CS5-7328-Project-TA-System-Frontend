import React, { useState, useEffect } from 'react';
import { getAllTaEvaluations } from '../../services/evaluate';
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Grid,
  Typography,

} from '@mui/material';

type PerformanceResult = {
  taUserId: number;
  facultyUserId: number;
  courseId: number;
  teachingSkill: number;
  mentoringSkill: number;
  effectiveCommunication: number;
  comments: string;
};


const ratingToPercentage = (rating: number) => (rating / 10) * 100;

const PerformanceResultPage: React.FC = () => {
  const [results, setResults] = useState<PerformanceResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getAllTaEvaluations();
        setResults(data);
      } catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
          console.error('Error:', error.message);
          alert('Failed to fetch performance results: ' + error.message);
        } else {
          // Handle cases where the error is not an instance of Error
          console.error('An unexpected error occurred:', error);
          alert('An unexpected error occurred while fetching performance results');
        }
      }
    };

    fetchResults();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom component="div" style={{ textAlign: 'center' }}>
          TA Performance Results
        </Typography>
        {results.map((result) => (
          <Card variant="outlined" key={result.courseId} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{result.taUserId}</Typography>
              <Typography color="textSecondary">Professor: {result.facultyUserId}</Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Teaching Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={ratingToPercentage(result.teachingSkill)} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.teachingSkill}/10</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Mentoring Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={ratingToPercentage(result.mentoringSkill)} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.mentoringSkill}/10</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Effective Communication:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={ratingToPercentage(result.effectiveCommunication)} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.effectiveCommunication}/10</Typography>
                </Grid>
              </Grid>

              <Typography variant="body1">Comment: {result.comments}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PerformanceResultPage;
