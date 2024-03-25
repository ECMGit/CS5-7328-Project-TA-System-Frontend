import React, { useState, useEffect } from 'react';
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
  id: number;
  taUserId: number;
  facultyUserId: number;
  courseId: number;
  teachingSkill: number;
  mentoringSkill: number;
  effectiveCommunication: number;
  comments: string;
  createdAt: string;
  taUser: {
    username: string;
  };
  facultyUser: {
    username: string;
  };
  course: {
    title: string;
  };
};


const ratingToPercentage = (rating: number) => (rating / 10) * 100;

const PerformanceResultPage: React.FC = () => {
  const [results, setResults] = useState<PerformanceResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/ta-performance/performance-results');
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
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
          <Card variant="outlined" key={result.id} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{result.course.title}</Typography>
              <Typography color="textSecondary">Professor: {result.facultyUser.username}</Typography>

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
              <Typography color="textSecondary">Reviewed on: {new Date(result.createdAt).toLocaleDateString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PerformanceResultPage;
