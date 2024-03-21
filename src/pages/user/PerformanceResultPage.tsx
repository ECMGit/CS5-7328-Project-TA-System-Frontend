import React from 'react';
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
  year: number;
  semester: string;
  courseName: string;
  professorName: string;
  teachingSkills: number;
  effectiveCommunication: number;
  mentoringSkills: number;
  comment: string;
  timestamp: string;
};

// 示例数据
const mockResults: PerformanceResult[] = [
  {
    year: 2023,
    semester: 'Fall',
    courseName: 'Advanced Algorithms',
    professorName: 'Dr. Smith',
    teachingSkills: 10,
    effectiveCommunication: 8,
    mentoringSkills: 9,
    comment: 'Excellent TA, very helpful and knowledgeable.',
    timestamp: '2023-12-01T15:00:00Z',
  },
  {
    year: 2023,
    semester: 'Spring',
    courseName: 'Introduction to Programming',
    professorName: 'Prof. Johnson',
    teachingSkills: 8,
    effectiveCommunication: 9,
    mentoringSkills: 7,
    comment: 'Good performance but needs to improve responsiveness.',
    timestamp: '2023-05-15T15:00:00Z',
  },
];

const ratingToPercentage = (rating: number) => (rating / 10) * 100;

const PerformanceResultPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom component="div" style={{ textAlign: 'center' }}>
          TA Performance Results
        </Typography>
        {mockResults.map((result, index) => (
          <Card variant="outlined" key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{result.courseName} ({result.year} {result.semester})</Typography>
              <Typography color="textSecondary">Professor: {result.professorName}</Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Teaching Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={ratingToPercentage(result.teachingSkills)} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.teachingSkills}/10</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Mentoring Skills:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={ratingToPercentage(result.mentoringSkills)} />
                </Grid>
                <Grid item xs={1}>
                  <Typography>{result.mentoringSkills}/10</Typography>
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

              <Typography variant="body1">Comment: {result.comment}</Typography>
              <Typography color="textSecondary">Reviewed on: {new Date(result.timestamp).toLocaleDateString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PerformanceResultPage;
